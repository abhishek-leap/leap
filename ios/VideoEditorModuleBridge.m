//
//  VideoEditorModuleBridge.m
//  leap
//
//  Created by BigStep on 07/02/23.
//

#ifndef VideoEditorModuleBridge_h
#define VideoEditorModuleBridge_h

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VideoEditorModule, NSObject)

RCT_EXTERN_METHOD(openVideoEditor: (NSString *)token groups:(NSString *)lensGroup resume:(BOOL)shouldResume resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end

#endif /* VideoEditorModuleBridge_h */
