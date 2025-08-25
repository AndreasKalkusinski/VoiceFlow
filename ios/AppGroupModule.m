//
//  AppGroupModule.m
//  SpeakFlowAI
//
//  Bridge for the native module
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AppGroupModule, NSObject)

RCT_EXTERN_METHOD(test:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getSharedAudioPath:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getSharedText:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end