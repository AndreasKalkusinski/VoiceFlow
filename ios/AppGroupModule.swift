//
//  AppGroupModule.swift
//  SpeakFlowAI
//
//  Native module to access App Group shared data
//

import Foundation
import React

@objc(AppGroupModule)
class AppGroupModule: NSObject {
    
    private let appGroupIdentifier = "group.de.jeantools.voiceflow"
    
    @objc
    func test(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        print("[AppGroupModule] Test method called")
        resolve("AppGroupModule is working!")
    }
    
    @objc
    func getSharedAudioPath(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        print("[AppGroupModule] getSharedAudioPath called")
        
        guard let userDefaults = UserDefaults(suiteName: appGroupIdentifier) else {
            print("[AppGroupModule] ERROR: Could not access app group")
            reject("APP_GROUP_ERROR", "Could not access app group", nil)
            return
        }
        
        print("[AppGroupModule] Checking UserDefaults keys...")
        
        // Log all keys in UserDefaults for debugging
        let allKeys = userDefaults.dictionaryRepresentation().keys
        print("[AppGroupModule] All UserDefaults keys: \(allKeys)")
        
        // Check for the flag first
        let hasNewContent = userDefaults.bool(forKey: "hasNewSharedContent")
        print("[AppGroupModule] hasNewSharedContent: \(hasNewContent)")
        
        // Check if there's a shared audio file
        if let audioPath = userDefaults.string(forKey: "sharedAudioPath"),
           let timestamp = userDefaults.object(forKey: "sharedTimestamp") as? TimeInterval {
            
            print("[AppGroupModule] Found audio path: \(audioPath)")
            print("[AppGroupModule] Timestamp: \(timestamp)")
            
            // Check if the file exists
            if FileManager.default.fileExists(atPath: audioPath) {
                print("[AppGroupModule] File exists, clearing UserDefaults and returning path")
                
                // Clear the values after reading
                userDefaults.removeObject(forKey: "sharedAudioPath")
                userDefaults.removeObject(forKey: "sharedTimestamp")
                userDefaults.removeObject(forKey: "hasNewSharedContent")
                userDefaults.synchronize()
                
                // Return file URL
                let fileURL = URL(fileURLWithPath: audioPath)
                let result: [String: Any] = [
                    "path": fileURL.absoluteString,
                    "timestamp": timestamp
                ]
                print("[AppGroupModule] Returning: \(result)")
                resolve(result)
            } else {
                print("[AppGroupModule] File does not exist at path: \(audioPath)")
                resolve(nil)
            }
        } else {
            print("[AppGroupModule] No shared audio path found")
            resolve(nil)
        }
    }
    
    @objc
    func getSharedText(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        guard let userDefaults = UserDefaults(suiteName: appGroupIdentifier) else {
            reject("APP_GROUP_ERROR", "Could not access app group", nil)
            return
        }
        
        // Check if there's shared text
        if let sharedText = userDefaults.string(forKey: "sharedText"),
           let timestamp = userDefaults.object(forKey: "sharedTimestamp") as? TimeInterval {
            
            // Clear the values after reading
            userDefaults.removeObject(forKey: "sharedText")
            userDefaults.removeObject(forKey: "sharedTimestamp")
            userDefaults.synchronize()
            
            let result: [String: Any] = [
                "text": sharedText,
                "timestamp": timestamp
            ]
            resolve(result)
        } else {
            resolve(nil)
        }
    }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}