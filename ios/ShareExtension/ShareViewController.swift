//
//  ShareViewController.swift
//  ShareExtension
//
//  Created by Andreas Kalkusinski on 20.08.25.
//

import UIKit
import Social
import MobileCoreServices
import UniformTypeIdentifiers
import os.log
import UserNotifications

class ShareViewController: SLComposeServiceViewController {
    
    private let logger = OSLog(subsystem: "de.jeantools.voiceflow.ShareExtension", category: "ShareViewController")
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        os_log("ShareViewController viewDidLoad", log: logger, type: .debug)
        
        // Set placeholder text
        self.placeholder = "Nachricht hinzufügen (optional)..."
        
        // Set the title
        self.title = "An SpeakFlow AI senden"
        
        // Log what we received
        debugLogInputItems()
        
        // Start processing immediately
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in
            self?.startProcessing()
        }
    }
    
    private func startProcessing() {
        // Update title to show processing
        self.title = "⏳ Verarbeite Sprachnachricht..."
        
        // Disable the post button initially
        self.validateContent()
    }
    
    private func debugLogInputItems() {
        guard let extensionContext = self.extensionContext else {
            os_log("No extension context", log: logger, type: .error)
            return
        }
        
        guard let inputItems = extensionContext.inputItems as? [NSExtensionItem] else {
            os_log("No input items", log: logger, type: .error)
            return
        }
        
        os_log("Found %d input items", log: logger, type: .debug, inputItems.count)
        
        for (index, item) in inputItems.enumerated() {
            os_log("Item %d: %@", log: logger, type: .debug, index, item.debugDescription)
            
            if let attachments = item.attachments {
                os_log("  - Has %d attachments", log: logger, type: .debug, attachments.count)
                
                for (attIndex, attachment) in attachments.enumerated() {
                    os_log("  - Attachment %d types: %@", log: logger, type: .debug, attIndex, attachment.registeredTypeIdentifiers.joined(separator: ", "))
                }
            }
        }
    }
    
    override func isContentValid() -> Bool {
        return true
    }
    
    override func didSelectPost() {
        os_log("didSelectPost called", log: logger, type: .debug)
        print("[ShareExtension] didSelectPost called")
        NSLog("[ShareExtension] didSelectPost called - NSLog")
        
        // Check if we already saved the content
        if self.title?.contains("✅") == true {
            // Content already saved, just close the modal
            self.extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
            
            // Try to open the main app after a short delay
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                self.openMainApp()
            }
        } else {
            // First time - save the content
            testFileWrite()
            saveSharedContent()
        }
        
        // Don't call super - we handle completion ourselves
    }
    
    private func openMainApp() {
        // Use the app's URL scheme to open it
        let appURL = URL(string: "de.jeantools.voiceflow://shared")!
        
        // Get the responder chain
        var responder: UIResponder? = self
        while responder != nil {
            if let application = responder as? UIApplication {
                if application.canOpenURL(appURL) {
                    os_log("Opening main app with URL scheme", log: logger, type: .info)
                    application.open(appURL, options: [:], completionHandler: nil)
                } else {
                    os_log("Cannot open URL scheme", log: logger, type: .error)
                }
                break
            }
            responder = responder?.next
        }
    }
    
    private func testFileWrite() {
        os_log("Testing file write capability", log: logger, type: .debug)
        print("[ShareExtension] Testing file write capability")
        
        // Try to write to temp directory first
        let tempDir = NSTemporaryDirectory()
        let testFile = URL(fileURLWithPath: tempDir).appendingPathComponent("test_\(Date().timeIntervalSince1970).txt")
        
        do {
            try "Test write at \(Date())".write(to: testFile, atomically: true, encoding: .utf8)
            os_log("Successfully wrote test file to temp: %@", log: logger, type: .info, testFile.path)
            print("[ShareExtension] Successfully wrote test file to temp: \(testFile.path)")
        } catch {
            os_log("Failed to write test file to temp: %@", log: logger, type: .error, error.localizedDescription)
            print("[ShareExtension] Failed to write test file to temp: \(error)")
        }
        
        // Try app group
        if let groupURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.de.jeantools.voiceflow") {
            let groupTestFile = groupURL.appendingPathComponent("test_\(Date().timeIntervalSince1970).txt")
            do {
                try "Test write to app group at \(Date())".write(to: groupTestFile, atomically: true, encoding: .utf8)
                os_log("Successfully wrote test file to app group: %@", log: logger, type: .info, groupTestFile.path)
                print("[ShareExtension] Successfully wrote test file to app group: \(groupTestFile.path)")
            } catch {
                os_log("Failed to write test file to app group: %@", log: logger, type: .error, error.localizedDescription)
                print("[ShareExtension] Failed to write test file to app group: \(error)")
            }
        } else {
            os_log("Cannot access app group for test write", log: logger, type: .error)
            print("[ShareExtension] Cannot access app group for test write")
        }
    }
    
    private func saveSharedContent() {
        guard let extensionContext = self.extensionContext else {
            os_log("No extension context in saveSharedContent", log: logger, type: .error)
            self.extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
            return
        }
        
        // Get user text if any
        let userText = self.contentText ?? ""
        os_log("User text: %@", log: logger, type: .debug, userText)
        
        // Process attachments
        guard let inputItems = extensionContext.inputItems as? [NSExtensionItem] else {
            os_log("No input items, saving text only", log: logger, type: .debug)
            if !userText.isEmpty {
                saveText(userText)
            }
            self.extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
            return
        }
        
        var foundAudio = false
        
        for item in inputItems {
            guard let attachments = item.attachments else { continue }
            
            for provider in attachments {
                // Log what types this provider has
                os_log("Provider has types: %@", log: logger, type: .debug, provider.registeredTypeIdentifiers.joined(separator: ", "))
                
                // Try to load the first available type
                if let firstType = provider.registeredTypeIdentifiers.first {
                    os_log("Loading type: %@", log: logger, type: .debug, firstType)
                    
                    provider.loadItem(forTypeIdentifier: firstType, options: nil) { [weak self] (item, error) in
                        if let error = error {
                            os_log("Error loading item: %@", log: self?.logger ?? .default, type: .error, error.localizedDescription)
                        } else {
                            os_log("Loaded item of type: %@", log: self?.logger ?? .default, type: .debug, String(describing: type(of: item)))
                            
                            if let url = item as? URL {
                                os_log("Got URL: %@", log: self?.logger ?? .default, type: .debug, url.absoluteString)
                                self?.saveAudioFile(from: url, withText: userText)
                            } else if let data = item as? Data {
                                os_log("Got Data of size: %d bytes", log: self?.logger ?? .default, type: .debug, data.count)
                                self?.saveAudioData(data, withText: userText)
                            } else {
                                os_log("Unknown item type: %@", log: self?.logger ?? .default, type: .error, String(describing: item))
                            }
                        }
                        
                        // Don't auto-close - let user decide when to close
                        // The user can tap "Posten" or "Abbrechen" to close the modal
                    }
                    
                    foundAudio = true
                    break
                }
            }
            
            if foundAudio { break }
        }
        
        // If no audio found, save text and complete
        if !foundAudio {
            if !userText.isEmpty {
                saveText(userText)
            }
            // Don't auto-close - let user close manually
        }
    }
    
    private func saveAudioFile(from url: URL, withText text: String) {
        os_log("Saving audio file from URL: %@", log: logger, type: .debug, url.absoluteString)
        
        // Update UI to show saving
        DispatchQueue.main.async { [weak self] in
            self?.title = "💾 Speichere Audio..."
            self?.placeholder = "Audio wird gespeichert..."
        }
        
        // Check if we can access app group
        guard let groupURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.de.jeantools.voiceflow") else {
            os_log("Failed to access app group", log: logger, type: .error)
            DispatchQueue.main.async { [weak self] in
                self?.title = "❌ Fehler"
                self?.placeholder = "App Group nicht verfügbar"
            }
            return
        }
        
        os_log("App group URL: %@", log: logger, type: .debug, groupURL.absoluteString)
        
        let fileName = "voice_\(Int(Date().timeIntervalSince1970)).m4a"
        let destURL = groupURL.appendingPathComponent(fileName)
        
        do {
            // Check if source file exists
            if FileManager.default.fileExists(atPath: url.path) {
                os_log("Source file exists at: %@", log: logger, type: .debug, url.path)
            } else {
                os_log("Source file does NOT exist at: %@", log: logger, type: .error, url.path)
            }
            
            // Remove existing file if needed
            if FileManager.default.fileExists(atPath: destURL.path) {
                try FileManager.default.removeItem(at: destURL)
            }
            
            // Copy the audio file
            try FileManager.default.copyItem(at: url, to: destURL)
            os_log("Successfully copied audio to: %@", log: logger, type: .info, destURL.path)
            
            // Update UI to show transcribing
            DispatchQueue.main.async { [weak self] in
                self?.title = "🎙️ Transkribiere..."
                self?.placeholder = "Audio wird transkribiert..."
            }
            
            // Save to UserDefaults
            saveToUserDefaults(audioPath: destURL.path, text: text)
            
            // Show completion status
            DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) { [weak self] in
                self?.title = "✅ Audio gespeichert!"
                self?.placeholder = "Die Sprachnachricht wurde gespeichert.\n\nÖffne SpeakFlow AI für die Transkription.\n\nTippe auf 'Posten' um fortzufahren."
                self?.validateContent()
            }
        } catch {
            os_log("Error copying audio file: %@", log: logger, type: .error, error.localizedDescription)
            DispatchQueue.main.async { [weak self] in
                self?.title = "❌ Fehler"
                self?.placeholder = error.localizedDescription
            }
        }
    }
    
    private func saveAudioData(_ data: Data, withText text: String) {
        os_log("Saving audio data of size: %d bytes", log: logger, type: .debug, data.count)
        
        // Update UI to show saving
        DispatchQueue.main.async { [weak self] in
            self?.title = "💾 Speichere Audio..."
            self?.placeholder = "Audio wird gespeichert..."
        }
        
        guard let groupURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.de.jeantools.voiceflow") else {
            os_log("Failed to access app group", log: logger, type: .error)
            DispatchQueue.main.async { [weak self] in
                self?.title = "❌ Fehler"
                self?.placeholder = "App Group nicht verfügbar"
            }
            return
        }
        
        let fileName = "voice_\(Int(Date().timeIntervalSince1970)).m4a"
        let fileURL = groupURL.appendingPathComponent(fileName)
        
        do {
            try data.write(to: fileURL)
            os_log("Successfully saved audio data to: %@", log: logger, type: .info, fileURL.path)
            
            // Update UI to show transcribing
            DispatchQueue.main.async { [weak self] in
                self?.title = "🎙️ Transkribiere..."
                self?.placeholder = "Audio wird transkribiert..."
            }
            
            saveToUserDefaults(audioPath: fileURL.path, text: text)
            
            // Show completion status
            DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) { [weak self] in
                self?.title = "✅ Audio gespeichert!"
                self?.placeholder = "Die Sprachnachricht wurde gespeichert.\n\nÖffne SpeakFlow AI für die Transkription.\n\nTippe auf 'Posten' um fortzufahren."
                self?.validateContent()
            }
        } catch {
            os_log("Error saving audio data: %@", log: logger, type: .error, error.localizedDescription)
            DispatchQueue.main.async { [weak self] in
                self?.title = "❌ Fehler"
                self?.placeholder = error.localizedDescription
            }
        }
    }
    
    private func saveText(_ text: String) {
        os_log("Saving text: %@", log: logger, type: .debug, text)
        saveToUserDefaults(audioPath: nil, text: text)
    }
    
    private func saveToUserDefaults(audioPath: String?, text: String?) {
        guard let userDefaults = UserDefaults(suiteName: "group.de.jeantools.voiceflow") else {
            os_log("Failed to access UserDefaults for app group", log: logger, type: .error)
            return
        }
        
        let timestamp = Date().timeIntervalSince1970
        
        // Clear previous values
        userDefaults.removeObject(forKey: "sharedAudioPath")
        userDefaults.removeObject(forKey: "sharedText")
        
        if let audioPath = audioPath {
            userDefaults.set(audioPath, forKey: "sharedAudioPath")
            os_log("Saved audio path to UserDefaults: %@", log: logger, type: .info, audioPath)
        }
        
        if let text = text, !text.isEmpty {
            userDefaults.set(text, forKey: "sharedText")
            os_log("Saved text to UserDefaults", log: logger, type: .info)
        }
        
        userDefaults.set(timestamp, forKey: "sharedTimestamp")
        userDefaults.set(true, forKey: "hasNewSharedContent")
        
        // Force synchronize
        let success = userDefaults.synchronize()
        os_log("UserDefaults synchronize success: %@", log: logger, type: .info, success ? "YES" : "NO")
        
        // Verify the save
        if let savedPath = userDefaults.string(forKey: "sharedAudioPath") {
            os_log("Verified: Audio path saved as: %@", log: logger, type: .info, savedPath)
        }
        if userDefaults.bool(forKey: "hasNewSharedContent") {
            os_log("Verified: hasNewSharedContent flag is set", log: logger, type: .info)
        }
        
        // Send a local notification to inform the user
        sendNotification()
    }
    
    private func sendNotification() {
        let content = UNMutableNotificationContent()
        content.title = "SpeakFlow AI"
        content.body = "Sprachnachricht wurde empfangen. Öffne die App zur Transkription."
        content.sound = .default
        
        // Create a trigger for immediate delivery
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 1, repeats: false)
        
        // Create the request
        let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: trigger)
        
        // Add the request to the notification center
        UNUserNotificationCenter.current().add(request) { error in
            if let error = error {
                os_log("Failed to send notification: %@", log: self.logger, type: .error, error.localizedDescription)
            } else {
                os_log("Notification sent successfully", log: self.logger, type: .info)
            }
        }
    }
    
    override func configurationItems() -> [Any]! {
        return []
    }
}