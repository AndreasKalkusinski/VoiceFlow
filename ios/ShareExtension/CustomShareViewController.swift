//
//  CustomShareViewController.swift
//  ShareExtension
//
//  Custom Share Extension that processes audio and opens the main app
//

import UIKit
import MobileCoreServices
import UniformTypeIdentifiers
import os.log

class CustomShareViewController: UIViewController {
    
    private let logger = OSLog(subsystem: "de.jeantools.voiceflow.ShareExtension", category: "CustomShareViewController")
    private let appGroupIdentifier = "group.de.jeantools.voiceflow"
    
    @IBOutlet weak var statusLabel: UILabel!
    @IBOutlet weak var openAppButton: UIButton!
    @IBOutlet weak var cancelButton: UIButton!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Start processing immediately
        processSharedContent()
    }
    
    private func processSharedContent() {
        statusLabel.text = "Verarbeite Sprachnachricht..."
        activityIndicator.startAnimating()
        openAppButton.isEnabled = false
        
        guard let extensionContext = self.extensionContext else {
            showError("Keine Daten gefunden")
            return
        }
        
        guard let inputItems = extensionContext.inputItems as? [NSExtensionItem] else {
            showError("Keine Eingabedaten")
            return
        }
        
        for item in inputItems {
            guard let attachments = item.attachments else { continue }
            
            for provider in attachments {
                if let firstType = provider.registeredTypeIdentifiers.first {
                    provider.loadItem(forTypeIdentifier: firstType, options: nil) { [weak self] (item, error) in
                        DispatchQueue.main.async {
                            if let error = error {
                                self?.showError("Fehler: \(error.localizedDescription)")
                            } else if let url = item as? URL {
                                self?.saveAudioFile(from: url)
                            } else if let data = item as? Data {
                                self?.saveAudioData(data)
                            }
                        }
                    }
                    return
                }
            }
        }
    }
    
    private func saveAudioFile(from url: URL) {
        guard let groupURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroupIdentifier) else {
            showError("App Group nicht verfügbar")
            return
        }
        
        let fileName = "voice_\(Int(Date().timeIntervalSince1970)).m4a"
        let destURL = groupURL.appendingPathComponent(fileName)
        
        do {
            if FileManager.default.fileExists(atPath: destURL.path) {
                try FileManager.default.removeItem(at: destURL)
            }
            
            try FileManager.default.copyItem(at: url, to: destURL)
            saveToUserDefaults(audioPath: destURL.path)
            showSuccess()
        } catch {
            showError("Speichern fehlgeschlagen: \(error.localizedDescription)")
        }
    }
    
    private func saveAudioData(_ data: Data) {
        guard let groupURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroupIdentifier) else {
            showError("App Group nicht verfügbar")
            return
        }
        
        let fileName = "voice_\(Int(Date().timeIntervalSince1970)).m4a"
        let fileURL = groupURL.appendingPathComponent(fileName)
        
        do {
            try data.write(to: fileURL)
            saveToUserDefaults(audioPath: fileURL.path)
            showSuccess()
        } catch {
            showError("Speichern fehlgeschlagen: \(error.localizedDescription)")
        }
    }
    
    private func saveToUserDefaults(audioPath: String) {
        guard let userDefaults = UserDefaults(suiteName: appGroupIdentifier) else {
            return
        }
        
        userDefaults.set(audioPath, forKey: "sharedAudioPath")
        userDefaults.set(Date().timeIntervalSince1970, forKey: "sharedTimestamp")
        userDefaults.set(true, forKey: "hasNewSharedContent")
        userDefaults.synchronize()
    }
    
    private func showSuccess() {
        activityIndicator.stopAnimating()
        statusLabel.text = "✅ Sprachnachricht gespeichert!"
        openAppButton.isEnabled = true
    }
    
    private func showError(_ message: String) {
        activityIndicator.stopAnimating()
        statusLabel.text = "❌ \(message)"
        openAppButton.isEnabled = false
    }
    
    @IBAction func openAppTapped(_ sender: Any) {
        // Open the main app using URL scheme
        if let url = URL(string: "de.jeantools.voiceflow://shared") {
            let selector = NSSelectorFromString("openURL:")
            if self.extensionContext?.perform(selector, with: url) != nil {
                os_log("Opening main app", log: logger, type: .info)
            }
        }
        
        // Close the extension
        self.extensionContext?.completeRequest(returningItems: nil, completionHandler: nil)
    }
    
    @IBAction func cancelTapped(_ sender: Any) {
        self.extensionContext?.cancelRequest(withError: NSError(domain: "ShareExtension", code: 0, userInfo: nil))
    }
}