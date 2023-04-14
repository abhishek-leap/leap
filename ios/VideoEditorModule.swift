//
//  VideoEditorModule.swift
//  playLeap
//
//  Created by Jovanpreet Randhawa on 21/01/22.
//

import Foundation
import React
import LeapVideoEditor
import SCSDKCameraKit

@objc(VideoEditorModule)
class VideoEditorModule: NSObject, RCTBridgeModule {
    
    fileprivate var supportedOrientations: UIInterfaceOrientationMask = .portrait
    
    private var cameraController: LeapCameraViewController?
    
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    private var currentResolve: RCTPromiseResolveBlock?
    private var currentReject: RCTPromiseRejectBlock?
    
    // Export callback
    @objc
    func openVideoEditor(_ token: String, groups lensGroup: String, resume shouldResume: Bool, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        self.currentResolve = resolve
        self.currentReject = reject
        
        DispatchQueue.main.async {[weak self] in
            guard let self = self, let presentedVC = RCTPresentedViewController() else {
                return
            }
            let apiToken = "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjUyMTkzNjYxLCJzdWIiOiI0M2ZkM2I3OC1hNDVhLTQ5MTktYWI1MC01MjkzZGYwMzBlODZ-UFJPRFVDVElPTn40YmJlOTMxNS03ZjVjLTRiMzItYTM4Ni1iNmM2OGM5ZWQzMjQifQ.1Uq_VmNgiOEAzvQD5rmSI9AYQf1VfANrgHETypcMt8U"
            let cameraController = LeapCameraViewController(repoGroups: lensGroup.split(separator: ",").map({ String($0) }), videoEditorDelegate: self, sessionConfig: SessionConfig(applicationID: "43fd3b78-a45a-4919-ab50-5293df030e86", apiToken: apiToken), token: token, shouldResume: shouldResume, environment: Path.getENV)
            cameraController.appOrientationDelegate = self
            cameraController.presentController(from: presentedVC)
            self.cameraController = cameraController
        }
    }
    
    // MARK: - RCTBridgeModule
    static func moduleName() -> String! {
        return "VideoEditorModule"
    }
}

extension VideoEditorModule: LeapAppOrientationDelegate {

    func lockOrientation(_ orientation: UIInterfaceOrientationMask) {
        supportedOrientations = orientation
    }

    func unlockOrientation() {
        supportedOrientations = .allButUpsideDown
    }
}

extension VideoEditorModule: VideoEditorDelegate {
    
    func videoEditorDidCancel() {
        currentResolve!(NSNull())
        cameraController = nil
    }
    
    func videoEditorDidCapture(videoURL: URL, videoFinalObject: [String: String]) {
//        if success {
            // Result urls. You could interact with your own implementation.
            // currentResolve!(videoURL.absoluteString)

             if let jsonData = try? JSONSerialization.data(withJSONObject: videoFinalObject, options: []) {
                if let jsonString = String(data: jsonData, encoding: .utf8) {
                  currentResolve!(jsonString)
                }
            } else {
              currentResolve!(NSNull())
            }
            
//            // remove strong reference to video editor sdk instance
//            self?.videoEditorSDK = nil
//        } else {
//            self?.currentReject!("", error?.errorMessage, nil)
//            // remove strong reference to video editor sdk instance
//            self?.videoEditorSDK = nil
//            print("Error: \(String(describing: error))")
//        }
        cameraController = nil
    }
}
