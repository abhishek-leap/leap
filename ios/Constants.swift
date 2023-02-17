//
//  Constants.swift
//  playLeap
//
//  Created by Jovanpreet Randhawa on 07/03/22.
//

import Foundation

struct Path {
    static var baseUrl: String {
        if getENV == "leapStaging" {
            return "https://appstg.playleap.io/"
        }
//        return "https://deploy-preview-806--leap-prod.netlify.app/"
        return "https://app.playleap.io/"
    }
    
    static var getENV: String {
//        "leapStaging"
        UserDefaults.standard.string(forKey: "env_preference") ?? "leapProduction"
    }
}

struct AppConstants{
    static let TwitterKey = "kDqilSKmWpHq8vTm0iqRMoxA7"
}
