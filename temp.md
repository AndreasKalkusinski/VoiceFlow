-------------------------------------
Translated Report (Full Report Below)
---

---

Incident Identifier: EE4294A1-E61C-4FCA-BDAB-B8F17DC3A3D7
CrashReporter Key: AFDE487A-45CD-C120-478E-10D1C4941912
Hardware Model: MacBookPro18,1
Process: Expo Go [24085]
Path: /Users/USER/Library/Developer/CoreSimulator/Devices/61D71778-D7FB-45DD-912F-FC0C387DE910/data/Containers/Bundle/Application/887DD1DC-A814-4BF0-87F8-2B0352948750/Exponent-2.33.13.tar.app/Expo Go
Identifier: host.exp.Exponent
Version: 2.33.13 (2.33.13)
Code Type: ARM-64 (Native)
Role: Foreground
Parent Process: launchd_sim [16013]
Coalition: com.apple.CoreSimulator.SimDevice.61D71778-D7FB-45DD-912F-FC0C387DE910 [30744]
Responsible Process: SimulatorTrampoline [52102]

Date/Time: 2025-08-14 16:10:03.5468 +0200
Launch Time: 2025-08-14 08:51:37.3041 +0200
OS Version: macOS 15.6 (24G84)
Release Type: User
Report Version: 104

Exception Type: EXC_BAD_ACCESS (SIGSEGV)
Exception Subtype: KERN_INVALID_ADDRESS at 0x0000beaddaaa9d78 -> 0x00003eaddaaa9d78 (possible pointer authentication failure)
Exception Codes: 0x0000000000000001, 0x0000beaddaaa9d78
VM Region Info: 0x3eaddaaa9d78 is not in any region. Bytes after previous region: 68435323821433 Bytes before following region: 36636697387656
REGION TYPE START - END [ VSIZE] PRT/MAX SHRMOD REGION DETAIL
VM_ALLOCATE 7003418000-7003800000 [ 4000K] rw-/rwx SM=ZER  
---> GAP OF 0x5f8ffc800000 BYTES
MALLOC_NANO 600000000000-600020000000 [512.0M] rw-/rwx SM=PRV  
Termination Reason: SIGNAL 11 Segmentation fault: 11
Terminating Process: exc handler [24085]

Triggered by Thread: 56

Kernel Triage:
VM - (arg = 0x3) mach_vm_allocate_kernel failed within call to vm_map_enter
VM - (arg = 0x3) mach_vm_allocate_kernel failed within call to vm_map_enter
VM - (arg = 0x3) mach_vm_allocate_kernel failed within call to vm_map_enter
VM - (arg = 0x3) mach_vm_allocate_kernel failed within call to vm_map_enter
VM - (arg = 0x3) mach_vm_allocate_kernel failed within call to vm_map_enter

Thread 0:: Dispatch queue: com.apple.main-thread
0 libsystem*kernel.dylib 0x10797d6b4 read + 8
1 Foundation 0x180b265d4 readBytesFromFileDescriptor(*:path:buffer:length:readUntilLength:reportProgress:) + 364
2 Foundation 0x180b247d0 readBytesFromFile(path:reportProgress:maxLength:options:attributesToRead:attributes:) + 5660
3 Foundation 0x180b270cc specialized static NSData.\_readBytes(fromPath:maxLength:bytes:length:didMap:options:reportProgress:) + 148
4 Foundation 0x180b261c8 @objc static NSData.\_readBytes(fromPath:maxLength:bytes:length:didMap:options:reportProgress:) + 96
5 Foundation 0x180f278dc -[NSString initWithContentsOfFile:encoding:error:] + 176
6 Foundation 0x180f22590 +[NSString stringWithContentsOfFile:encoding:error:] + 48
7 Expo Go 0x10225dda4 -[EXAppLoaderExpoUpdates _startLoaderTask] + 840
8 Expo Go 0x1022595f8 -[EXAppViewController refresh] + 88
9 Expo Go 0x102258fa4 -[EXAppViewController viewDidAppear:] + 280
10 UIKitCore 0x1854e2fec -[UIViewController _setViewAppearState:isAnimating:] + 872
11 UIKitCore 0x1854e3b58 -[UIViewController __viewDidAppear:] + 160
12 UIKitCore 0x1854e5060 **64-[UIViewController viewDidMoveToWindow:shouldAppearOrDisappear:]\_block_invoke + 40
13 UIKitCore 0x1854e4364 -[UIViewController _executeAfterAppearanceBlock] + 76
14 UIKitCore 0x1861729a8 -[_UIAfterCACommitBlock run] + 64
15 UIKitCore 0x186172dbc -[_UIAfterCACommitQueue flush] + 164
16 UIKitCore 0x185c6654c \_runAfterCACommitDeferredBlocks + 256
17 UIKitCore 0x185c58028 \_cleanUpAfterCAFlushAndRunDeferredBlocks + 76
18 UIKitCore 0x185c580f0 \_UIApplicationFlushCATransaction + 68
19 UIKitCore 0x185b88c60 **setupUpdateSequence_block_invoke_2 + 356
20 UIKitCore 0x1851bd0c0 \_UIUpdateSequenceRun + 76
21 UIKitCore 0x185b884f4 schedulerStepScheduledMainSection + 204
22 UIKitCore 0x185b87910 runloopSourceCallback + 80
23 CoreFoundation 0x180429368 **CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION** + 24
24 CoreFoundation 0x1804292b0 **CFRunLoopDoSource0 + 168
25 CoreFoundation 0x180428a38 **CFRunLoopDoSources0 + 220
26 CoreFoundation 0x180423434 \_\_CFRunLoopRun + 780
27 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
28 GraphicsServices 0x191004d00 GSEventRunModal + 164
29 UIKitCore 0x185c597d4 -[UIApplication _run] + 796
30 UIKitCore 0x185c5dba0 UIApplicationMain + 124
31 Expo Go 0x10228bc9c main + 64
32 ??? 0x107ab93d4 ???
33 dyld 0x107852b98 start + 6076

Thread 1:: com.apple.uikit.eventfetch-thread
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 Foundation 0x180f0e5ac -[NSRunLoop(NSRunLoop) runUntilDate:] + 60
9 UIKitCore 0x185d07390 -[UIEventFetcher threadMain] + 408
10 Foundation 0x180f35148 **NSThread**start\_\_ + 716
11 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
12 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 2:: com.google.firebase.crashlytics.MachExceptionServer
0 libsystem_kernel.dylib 0x1079802e0 write + 8
1 Expo Go 0x102708dd8 FIRCLSFileLoopWithWriteBlock + 56
2 Expo Go 0x102708f8c FIRCLSFileFDWriteUInt64 + 124
3 Expo Go 0x102709074 FIRCLSFileFDWriteInt64 + 116
4 Expo Go 0x10270bab8 FIRCLSSDKFileLog + 352
5 Expo Go 0x10270d6a8 FIRCLSMachExceptionServer + 976
6 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
7 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 3:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 4:: caulk.messenger.shared:17
0 libsystem_kernel.dylib 0x10797caec semaphore_wait_trap + 8
1 caulk 0x1b6b51b3c caulk::semaphore::timed_wait(double) + 220
2 caulk 0x1b6b58c40 caulk::concurrent::details::worker_thread::run() + 28
3 caulk 0x1b6b58cb4 void* caulk::thread_proxy<std::\_\_1::tuple<caulk::thread::attributes, void (caulk::concurrent::details::worker_thread::*)(), std::\_\_1::tuple<caulk::concurrent::details::worker_thread*>>>(void*) + 48
4 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
5 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 5:: caulk.messenger.shared:high
0 libsystem_kernel.dylib 0x10797caec semaphore_wait_trap + 8
1 caulk 0x1b6b51b3c caulk::semaphore::timed_wait(double) + 220
2 caulk 0x1b6b58c40 caulk::concurrent::details::worker_thread::run() + 28
3 caulk 0x1b6b58cb4 void* caulk::thread_proxy<std::\_\_1::tuple<caulk::thread::attributes, void (caulk::concurrent::details::worker_thread::*)(), std::\_\_1::tuple<caulk::concurrent::details::worker_thread*>>>(void*) + 48
4 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
5 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 6:: com.apple.NSURLConnectionLoader
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 CFNetwork 0x184b2a0f0 +[__CFN_CoreSchedulingSetRunnable _run:] + 368
8 Foundation 0x180f35148 **NSThread**start\_\_ + 716
9 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
10 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 7:: com.facebook.SocketRocket.NetworkThread
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 Expo Go 0x102b90cf4 -[SRRunLoopThread main] + 224
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 8:: com.apple.CFSocket.private
0 libsystem_kernel.dylib 0x107986f98 **select + 8
1 CoreFoundation 0x1804377a4 **CFSocketManager + 680
2 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
3 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 9:: com.apple.CFStream.LegacyThread
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 CoreFoundation 0x180446fdc \_legacyStreamRunLoop_workThread + 260
8 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
9 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 10:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 11:: com.apple.CFNetwork.CustomProtocols
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 CFNetwork 0x184b2a0f0 +[__CFN_CoreSchedulingSetRunnable _run:] + 368
8 Foundation 0x180f35148 **NSThread**start\_\_ + 716
9 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
10 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 12:: com.apple.CoreMotion.MotionThread
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 CoreFoundation 0x180423ba0 CFRunLoopRun + 60
8 CoreMotion 0x194ca49b8 0x194aca000 + 1943992
9 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
10 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 13:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 14:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 15:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 16:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 17:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 18:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 19:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 20:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 21:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 22:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 23:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 24:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 25:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 26:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 27:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 28:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 29:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 30:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 31:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 32:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 33:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 34:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 35:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 36:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 37:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 38:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 39:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 40:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 41:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 42:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 43:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 44:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 45:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 46:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 47:: com.facebook.react.runtime.JavaScript
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Expo Go 0x102a9c894 +[RCTJSThreadManager runRunLoop] + 212
8 Foundation 0x180f35148 **NSThread**start\_\_ + 716
9 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
10 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 48:: hades
0 libsystem_kernel.dylib 0x107980014 **psynch_cvwait + 8
1 libsystem_pthread.dylib 0x1077caab8 \_pthread_cond_wait + 976
2 libc++.1.dylib 0x18030c358 std::**1::condition_variable::wait(std::**1::unique_lock<std::**1::mutex>&) + 28
3 hermes 0x10899634c hermes::vm::HadesGC::Executor::worker() + 116
4 hermes 0x1089962b4 void* std::**1::**thread_proxy[abi:nn180100]<std::**1::tuple<std::**1::unique_ptr<std::**1::**thread_struct, std::**1::default_delete<std::**1::\_\_thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*) + 44
5 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
6 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 49:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 50:: hades
0 libsystem_kernel.dylib 0x107980014 **psynch_cvwait + 8
1 libsystem_pthread.dylib 0x1077caab8 \_pthread_cond_wait + 976
2 libc++.1.dylib 0x18030c358 std::**1::condition_variable::wait(std::**1::unique_lock<std::**1::mutex>&) + 28
3 hermes 0x10899634c hermes::vm::HadesGC::Executor::worker() + 116
4 hermes 0x1089962b4 void* std::**1::**thread_proxy[abi:nn180100]<std::**1::tuple<std::**1::unique_ptr<std::**1::**thread_struct, std::**1::default_delete<std::**1::\_\_thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*) + 44
5 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
6 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 51:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 52:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 53:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 54:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 55:
0 libsystem_pthread.dylib 0x1077c5984 start_wqthread + 0

Thread 56 Crashed:: com.facebook.react.runtime.JavaScript
0 Expo Go 0x102987ff8 std::**1::**function::**func<facebook::react::Scheduler::uiManagerDidDispatchCommand(std::**1::shared_ptr<facebook::react::ShadowNode const> const&, std::**1::basic_string<char, std::**1::char_traits<char>, std::**1::allocator<char>> const&, folly::dynamic const&)::$\_0, std::**1::allocator<facebook::react::Scheduler::uiManagerDidDispatchCommand(std::**1::shared_ptr<facebook::react::ShadowNode const> const&, std::**1::basic_string<char, std::**1::char_traits<char>, std::**1::allocator<char>> const&, folly::dynamic const&)::$_0>, void ()>::operator()() + 20
1   Expo Go                       	       0x102b14e9c facebook::react::RuntimeScheduler_Modern::updateRendering() + 140
2   Expo Go                       	       0x102b14aec facebook::react::RuntimeScheduler_Modern::runEventLoopTick(facebook::jsi::Runtime&, facebook::react::Task&, std::__1::chrono::time_point<std::__1::chrono::steady_clock, std::__1::chrono::duration<long long, std::__1::ratio<1l, 1000000000l>>>) + 228
3   Expo Go                       	       0x102b147e0 facebook::react::RuntimeScheduler_Modern::runEventLoop(facebook::jsi::Runtime&, bool) + 148
4   Expo Go                       	       0x102aa0b84 _ZNSt3__110__function6__funcIZZN8facebook5react13ReactInstanceC1ENS_10unique_ptrINS3_9JSRuntimeENS_14default_deleteIS6_EEEENS_10shared_ptrINS3_18MessageQueueThreadEEENSA_INS3_12TimerManagerEEENS_8functionIFvRNS2_3jsi7RuntimeERKNS3_14JsErrorHandler14ProcessedErrorEEEEPNS3_18jsinspector_modern10HostTargetEENK3$\_0clINSF_IFvSI_EEEEEDaT_EUlvE_NS_9allocatorISY_EEFvvEEclEv + 116
5 Expo Go 0x1028bc7a0 facebook::react::tryAndReturnError(std::**1::function<void ()> const&) + 32
6 Expo Go 0x1028cd29c facebook::react::RCTMessageThread::tryFunc(std::**1::function<void ()> const&) + 24
7 Expo Go 0x1028cd0a0 invocation function for block in facebook::react::RCTMessageThread::runAsync(std::**1::function<void ()>) + 44
8 CoreFoundation 0x180429134 **CFRUNLOOP_IS_CALLING_OUT_TO_A_BLOCK** + 20
9 CoreFoundation 0x180428898 **CFRunLoopDoBlocks + 348
10 CoreFoundation 0x180423a2c **CFRunLoopRun + 2308
11 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
12 Expo Go 0x102a9c894 +[RCTJSThreadManager runRunLoop] + 212
13 Foundation 0x180f35148 **NSThread**start** + 716
14 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
15 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 57:: hades
0 libsystem_kernel.dylib 0x107980014 **psynch_cvwait + 8
1 libsystem_pthread.dylib 0x1077caab8 \_pthread_cond_wait + 976
2 libc++.1.dylib 0x18030c358 std::**1::condition_variable::wait(std::**1::unique_lock<std::**1::mutex>&) + 28
3 hermes 0x10899634c hermes::vm::HadesGC::Executor::worker() + 116
4 hermes 0x1089962b4 void* std::**1::**thread_proxy[abi:nn180100]<std::**1::tuple<std::**1::unique_ptr<std::**1::**thread_struct, std::**1::default_delete<std::**1::\_\_thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*) + 44
5 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
6 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 58:
0 libsystem_pthread.dylib 0x1077c5984 start_wqthread + 0

Thread 59:: AXSpeech
0 libsystem_kernel.dylib 0x10797cb70 mach_msg2_trap + 8
1 libsystem_kernel.dylib 0x10798dfac mach_msg2_internal + 72
2 libsystem_kernel.dylib 0x107984c28 mach_msg_overwrite + 480
3 libsystem_kernel.dylib 0x10797ced8 mach_msg + 20
4 CoreFoundation 0x180428bc4 **CFRunLoopServiceMachPort + 156
5 CoreFoundation 0x1804235a4 **CFRunLoopRun + 1148
6 CoreFoundation 0x180422cec CFRunLoopRunSpecific + 536
7 Foundation 0x180f0e38c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 208
8 TextToSpeech 0x1b6c370f8 0x1b6c0d000 + 172280
9 Foundation 0x180f35148 **NSThread**start\_\_ + 716
10 libsystem_pthread.dylib 0x1077ca5f0 \_pthread_start + 104
11 libsystem_pthread.dylib 0x1077c5998 thread_start + 8

Thread 60:
0 libsystem_pthread.dylib 0x1077c5984 start_wqthread + 0

Thread 56 crashed with ARM Thread State (64-bit):
x0: 0x0000000125d2cd50 x1: 0x0000000125d2cd60 x2: 0x0000000125d2ce48 x3: 0x0000000125d2ce60
x4: 0x00000001078052a0 x5: 0x00000001078052a0 x6: 0x000000016f799808 x7: 0x0000000000000d70
x8: 0x0000600004079d60 x9: 0x0000beaddaaa9d60 x10: 0x0000000000000000 x11: 0x00000000000024c0
x12: 0x00000000000007fb x13: 0x00000000000007fd x14: 0x000000008d032127 x15: 0x000000008ce31991
x16: 0x000000008d000000 x17: 0x0000000000000127 x18: 0x0000000000000000 x19: 0x0000000107c38610
x20: 0x0000000107c38750 x21: 0x0000e5abaa592287 x22: 0x00006000035227e0 x23: 0x00006000026974f8
x24: 0x0000000000000003 x25: 0xffffffffffffffff x26: 0x00000000141300cd x27: 0x0000000000000000
x28: 0x0000000000000000 fp: 0x000000016f799c10 lr: 0x0000000102b14e9c
sp: 0x000000016f799be0 pc: 0x0000000102987ff8 cpsr: 0x60001000
far: 0x0000beaddaaa9d78 esr: 0x92000004 (Data Abort) byte read Translation fault

Binary Images:
0x10784c000 - 0x1078e7fff dyld (_) <3247e185-ced2-36ff-9e29-47a77c23e004> /usr/lib/dyld
0x102248000 - 0x104753fff host.exp.Exponent (2.33.13) <1cbadbc4-db5b-3fab-b22b-549dcf6c2c24> /Users/USER/Library/Developer/CoreSimulator/Devices/61D71778-D7FB-45DD-912F-FC0C387DE910/data/Containers/Bundle/Application/887DD1DC-A814-4BF0-87F8-2B0352948750/Exponent-2.33.13.tar.app/Expo Go
0x108844000 - 0x108ad7fff dev.hermesengine.iphonesimulator (0.12.0) <540cccf0-83c0-3fe1-a1df-264c31bc09ba> /Users/USER/Library/Developer/CoreSimulator/Devices/61D71778-D7FB-45DD-912F-FC0C387DE910/data/Containers/Bundle/Application/887DD1DC-A814-4BF0-87F8-2B0352948750/Exponent-2.33.13.tar.app/Frameworks/hermes.framework/hermes
0x107804000 - 0x10780bfff libsystem_platform.dylib (_) <43ef9892-7edb-34c5-88d6-2c79fa2e7bd3> /usr/lib/system/libsystem_platform.dylib
0x10797c000 - 0x1079b7fff libsystem_kernel.dylib (_) <0960cf7e-fb2e-3068-998e-131a316ed666> /usr/lib/system/libsystem_kernel.dylib
0x1077c4000 - 0x1077d3fff libsystem_pthread.dylib (_) <421e2342-6729-3a9f-a439-29ad130875b3> /usr/lib/system/libsystem_pthread.dylib
0x107bec000 - 0x107bf7fff libobjc-trampolines.dylib (_) <56878cbd-4b61-3d67-a830-23a1b2beaf59> /Volumes/VOLUME/_/libobjc-trampolines.dylib
0x18082d000 - 0x1813dce3f com.apple.Foundation (6.9) <48eb0271-c8d1-359a-bd56-bcf3e7e37dc5> /Volumes/VOLUME/_/Foundation.framework/Foundation
0x184dfb000 - 0x186b672bf com.apple.UIKitCore (1.0) <f5406608-aa34-30ba-8494-0a8b531792f5> /Volumes/VOLUME/_/UIKitCore.framework/UIKitCore
0x180396000 - 0x1807adfff com.apple.CoreFoundation (6.9) <ae27f481-c1fa-359c-b04c-af9cda7655ff> /Volumes/VOLUME/_/CoreFoundation.framework/CoreFoundation
0x191002000 - 0x19100a1ff com.apple.GraphicsServices (1.0) <80b30bb2-e6e1-317e-b798-ea590de713a8> /Volumes/VOLUME/_/GraphicsServices.framework/GraphicsServices
0x0 - 0xffffffffffffffff ??? (_) <00000000-0000-0000-0000-000000000000> ???
0x1b6c0d000 - 0x1b6de2fdf com.apple.texttospeech (1.0.0) <a1620dc8-7943-3238-9daa-dc6d73391990> /Volumes/VOLUME/_/TextToSpeech.framework/TextToSpeech
0x1b6b42000 - 0x1b6b675df com.apple.audio.caulk (1.0) <7f22c3c4-1a93-34dd-bf46-522f8d2a0e77> /Volumes/VOLUME/_/caulk.framework/caulk
0x184922000 - 0x184ca399f com.apple.CFNetwork (1.0) <a726149c-9657-391f-bfdd-fd9ed415d3cc> /Volumes/VOLUME/_/CFNetwork.framework/CFNetwork
0x194aca000 - 0x194e36bdf com.apple.coremotion (2964.0.4) <8e2bb204-90e0-33b1-adce-d0cda263d89d> /Volumes/VOLUME/_/CoreMotion.framework/CoreMotion
0x1802ec000 - 0x180370ffb libc++.1.dylib (_) <b81f25b5-2a12-36cd-84e2-b8c80df7d07b> /Volumes/VOLUME/\*/libc++.1.dylib

EOF

---

## Full Report

{"app*name":"Expo Go","timestamp":"2025-08-14 16:10:10.00 +0200","app_version":"2.33.13","slice_uuid":"1cbadbc4-db5b-3fab-b22b-549dcf6c2c24","build_version":"2.33.13","platform":7,"bundleID":"host.exp.Exponent","share_with_app_devs":0,"is_first_party":0,"bug_type":"309","os_version":"macOS 15.6 (24G84)","roots_installed":0,"name":"Expo Go","incident_id":"EE4294A1-E61C-4FCA-BDAB-B8F17DC3A3D7"}
{
"uptime" : 200000,
"procRole" : "Foreground",
"version" : 2,
"userID" : 501,
"deployVersion" : 210,
"modelCode" : "MacBookPro18,1",
"coalitionID" : 30744,
"osVersion" : {
"train" : "macOS 15.6",
"build" : "24G84",
"releaseType" : "User"
},
"captureTime" : "2025-08-14 16:10:03.5468 +0200",
"codeSigningMonitor" : 1,
"incident" : "EE4294A1-E61C-4FCA-BDAB-B8F17DC3A3D7",
"pid" : 24085,
"translated" : false,
"cpuType" : "ARM-64",
"roots_installed" : 0,
"bug_type" : "309",
"procLaunch" : "2025-08-14 08:51:37.3041 +0200",
"procStartAbsTime" : 4456401498158,
"procExitAbsTime" : 4991533606800,
"procName" : "Expo Go",
"procPath" : "\/Users\/USER\/Library\/Developer\/CoreSimulator\/Devices\/61D71778-D7FB-45DD-912F-FC0C387DE910\/data\/Containers\/Bundle\/Application\/887DD1DC-A814-4BF0-87F8-2B0352948750\/Exponent-2.33.13.tar.app\/Expo Go",
"bundleInfo" : {"CFBundleShortVersionString":"2.33.13","CFBundleVersion":"2.33.13","CFBundleIdentifier":"host.exp.Exponent"},
"storeInfo" : {"deviceIdentifierForVendor":"19522699-0BD5-5638-A37A-0C62752FC20F","thirdParty":true},
"parentProc" : "launchd_sim",
"parentPid" : 16013,
"coalitionName" : "com.apple.CoreSimulator.SimDevice.61D71778-D7FB-45DD-912F-FC0C387DE910",
"crashReporterKey" : "AFDE487A-45CD-C120-478E-10D1C4941912",
"appleIntelligenceStatus" : {"state":"available"},
"responsiblePid" : 52102,
"responsibleProc" : "SimulatorTrampoline",
"codeSigningID" : "host.exp.Exponent",
"codeSigningTeamID" : "",
"codeSigningFlags" : 570425857,
"codeSigningValidationCategory" : 10,
"codeSigningTrustLevel" : 4294967295,
"codeSigningAuxiliaryInfo" : 0,
"instructionByteStream" : {"beforePC":"TAAAlOADE6r9e0Gp9E\/CqL80VxQIBED5AUAAkQLgA5EDQASRCQFA+Q==","atPC":"JA1A+eADCKqAAB\/W9E++qf17Aan9QwCR6AMBqvMDAKqB8QDQIYAXkQ=="},
"bootSessionUUID" : "625CC40E-30B0-47B6-A7E4-00DF4D203C56",
"wakeTime" : 11248,
"sleepWakeUUID" : "7A94179B-43F6-4932-94CC-DEA1D7346CED",
"sip" : "enabled",
"vmRegionInfo" : "0x3eaddaaa9d78 is not in any region. Bytes after previous region: 68435323821433 Bytes before following region: 36636697387656\n REGION TYPE START - END [ VSIZE] PRT\/MAX SHRMOD REGION DETAIL\n VM_ALLOCATE 7003418000-7003800000 [ 4000K] rw-\/rwx SM=ZER \n---> GAP OF 0x5f8ffc800000 BYTES\n MALLOC_NANO 600000000000-600020000000 [512.0M] rw-\/rwx SM=PRV ",
"exception" : {"codes":"0x0000000000000001, 0x0000beaddaaa9d78","rawCodes":[1,209653907234168],"type":"EXC_BAD_ACCESS","signal":"SIGSEGV","subtype":"KERN_INVALID_ADDRESS at 0x0000beaddaaa9d78 -> 0x00003eaddaaa9d78 (possible pointer authentication failure)"},
"termination" : {"flags":0,"code":11,"namespace":"SIGNAL","indicator":"Segmentation fault: 11","byProc":"exc handler","byPid":24085},
"ktriageinfo" : "VM - (arg = 0x3) mach_vm_allocate_kernel failed within call to vm_map_enter\nVM - (arg = 0x3) mach_vm_allocate_kernel failed within call to vm_map_enter\nVM - (arg = 0x3) mach_vm_allocate_kernel failed within call to vm_map_enter\nVM - (arg = 0x3) mach_vm_allocate_kernel failed within call to vm_map_enter\nVM - (arg = 0x3) mach_vm_allocate_kernel failed within call to vm_map_enter\n",
"vmregioninfo" : "0x3eaddaaa9d78 is not in any region. Bytes after previous region: 68435323821433 Bytes before following region: 36636697387656\n REGION TYPE START - END [ VSIZE] PRT\/MAX SHRMOD REGION DETAIL\n VM_ALLOCATE 7003418000-7003800000 [ 4000K] rw-\/rwx SM=ZER \n---> GAP OF 0x5f8ffc800000 BYTES\n MALLOC_NANO 600000000000-600020000000 [512.0M] rw-\/rwx SM=PRV ",
"extMods" : {"caller":{"thread_create":0,"thread_set_state":0,"task_for_pid":0},"system":{"thread_create":0,"thread_set_state":0,"task_for_pid":3},"targeted":{"thread_create":0,"thread_set_state":0,"task_for_pid":0},"warnings":0},
"faultingThread" : 56,
"threads" : [{"id":14663802,"threadState":{"x":[{"value":1310},{"value":0},{"value":1310},{"value":1310},{"value":1},{"value":0},{"value":105553120286240},{"value":0},{"value":1310},{"value":0},{"value":105553118553504},{"value":1},{"value":1},{"value":105553118553504},{"value":8368598816,"symbolLocation":0,"symbol":"OBJC_METACLASS*$_NSProgress"},{"value":8368598816,"symbolLocation":0,"symbol":"OBJC_METACLASS_$_NSProgress"},{"value":3},{"value":6459262492,"symbolLocation":0,"symbol":"+[NSProgress currentProgress]"},{"value":0},{"value":0},{"value":0},{"value":0},{"value":1310},{"value":1310},{"value":18446744071562067968},{"value":8502489088,"objc-selector":"plementSelector:"},{"value":2147483647},{"value":5056978944},{"value":27}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6454142420},"cpsr":{"value":1073745920},"fp":{"value":6135956656},"sp":{"value":6135956432},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422358708},"far":{"value":0}},"queue":"com.apple.main-thread","frames":[{"imageOffset":5812,"symbol":"read","symbolLocation":8,"imageIndex":4},{"imageOffset":3118548,"symbol":"readBytesFromFileDescriptor(_:path:buffer:length:readUntilLength:reportProgress:)","symbolLocation":364,"imageIndex":7},{"imageOffset":3110864,"symbol":"readBytesFromFile(path:reportProgress:maxLength:options:attributesToRead:attributes:)","symbolLocation":5660,"imageIndex":7},{"imageOffset":3121356,"symbol":"specialized static NSData._readBytes(fromPath:maxLength:bytes:length:didMap:options:reportProgress:)","symbolLocation":148,"imageIndex":7},{"imageOffset":3117512,"symbol":"@objc static NSData.\_readBytes(fromPath:maxLength:bytes:length:didMap:options:reportProgress:)","symbolLocation":96,"imageIndex":7},{"imageOffset":7317724,"symbol":"-[NSString initWithContentsOfFile:encoding:error:]","symbolLocation":176,"imageIndex":7},{"imageOffset":7296400,"symbol":"+[NSString stringWithContentsOfFile:encoding:error:]","symbolLocation":48,"imageIndex":7},{"imageOffset":89508,"symbol":"-[EXAppLoaderExpoUpdates _startLoaderTask]","symbolLocation":840,"imageIndex":1},{"imageOffset":71160,"symbol":"-[EXAppViewController refresh]","symbolLocation":88,"imageIndex":1},{"imageOffset":69540,"symbol":"-[EXAppViewController viewDidAppear:]","symbolLocation":280,"imageIndex":1},{"imageOffset":7241708,"symbol":"-[UIViewController _setViewAppearState:isAnimating:]","symbolLocation":872,"imageIndex":8},{"imageOffset":7244632,"symbol":"-[UIViewController __viewDidAppear:]","symbolLocation":160,"imageIndex":8},{"imageOffset":7250016,"symbol":"**64-[UIViewController viewDidMoveToWindow:shouldAppearOrDisappear:]\_block_invoke","symbolLocation":40,"imageIndex":8},{"imageOffset":7246692,"symbol":"-[UIViewController _executeAfterAppearanceBlock]","symbolLocation":76,"imageIndex":8},{"imageOffset":20412840,"symbol":"-[_UIAfterCACommitBlock run]","symbolLocation":64,"imageIndex":8},{"imageOffset":20413884,"symbol":"-[_UIAfterCACommitQueue flush]","symbolLocation":164,"imageIndex":8},{"imageOffset":15119692,"symbol":"\_runAfterCACommitDeferredBlocks","symbolLocation":256,"imageIndex":8},{"imageOffset":15061032,"symbol":"\_cleanUpAfterCAFlushAndRunDeferredBlocks","symbolLocation":76,"imageIndex":8},{"imageOffset":15061232,"symbol":"\_UIApplicationFlushCATransaction","symbolLocation":68,"imageIndex":8},{"imageOffset":14212192,"symbol":"**setupUpdateSequence_block_invoke_2","symbolLocation":356,"imageIndex":8},{"imageOffset":3940544,"symbol":"\_UIUpdateSequenceRun","symbolLocation":76,"imageIndex":8},{"imageOffset":14210292,"symbol":"schedulerStepScheduledMainSection","symbolLocation":204,"imageIndex":8},{"imageOffset":14207248,"symbol":"runloopSourceCallback","symbolLocation":80,"imageIndex":8},{"imageOffset":602984,"symbol":"**CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION**","symbolLocation":24,"imageIndex":9},{"imageOffset":602800,"symbol":"**CFRunLoopDoSource0","symbolLocation":168,"imageIndex":9},{"imageOffset":600632,"symbol":"**CFRunLoopDoSources0","symbolLocation":220,"imageIndex":9},{"imageOffset":578612,"symbol":"**CFRunLoopRun","symbolLocation":780,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":11520,"symbol":"GSEventRunModal","symbolLocation":164,"imageIndex":10},{"imageOffset":15067092,"symbol":"-[UIApplication _run]","symbolLocation":796,"imageIndex":8},{"imageOffset":15084448,"symbol":"UIApplicationMain","symbolLocation":124,"imageIndex":8},{"imageOffset":277660,"symbol":"main","symbolLocation":64,"imageIndex":1},{"imageOffset":4423652308,"imageIndex":11},{"imageOffset":27544,"symbol":"start","symbolLocation":6076,"imageIndex":0}]},{"id":14663814,"name":"com.apple.uikit.eventfetch-thread","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":53888954662912},{"value":0},{"value":53888954662912},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":12547},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":53888954662912},{"value":0},{"value":53888954662912},{"value":6138813832},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6138813680},"sp":{"value":6138813600},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":7214508,"symbol":"-[NSRunLoop(NSRunLoop) runUntilDate:]","symbolLocation":60,"imageIndex":7},{"imageOffset":15778704,"symbol":"-[UIEventFetcher threadMain]","symbolLocation":408,"imageIndex":8},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14663824,"name":"com.google.firebase.crashlytics.MachExceptionServer","threadState":{"x":[{"value":3},{"value":0},{"value":3},{"value":4420815436},{"value":10758893076480},{"value":0},{"value":0},{"value":0},{"value":4335898156,"symbolLocation":0,"symbol":"**FIRCLSFileWriteWithRetries_block_invoke"},{"value":4370052064,"symbolLocation":0,"symbol":"**block_descriptor_36_e13_q24\u0001?0r^v8Q16l"},{"value":48},{"value":87},{"value":0},{"value":1},{"value":48},{"value":0},{"value":4},{"value":6446618288,"symbolLocation":0,"symbol":"-[__NSCFString release]"},{"value":0},{"value":4497784168},{"value":3},{"value":4497784228},{"value":0},{"value":4362625615,"symbolLocation":14538,"symbol":"FIRCLSHexMap"},{"value":11},{"value":4335909740},{"value":4362623550,"symbolLocation":12473,"symbol":"FIRCLSHexMap"},{"value":4497784596},{"value":4362625576,"symbolLocation":14499,"symbol":"FIRCLSHexMap"}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4335898072},"cpsr":{"value":4096},"fp":{"value":4497784144},"sp":{"value":4497784112},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422370016},"far":{"value":0}},"frames":[{"imageOffset":17120,"symbol":"write","symbolLocation":8,"imageIndex":4},{"imageOffset":4984280,"symbol":"FIRCLSFileLoopWithWriteBlock","symbolLocation":56,"imageIndex":1},{"imageOffset":4984716,"symbol":"FIRCLSFileFDWriteUInt64","symbolLocation":124,"imageIndex":1},{"imageOffset":4984948,"symbol":"FIRCLSFileFDWriteInt64","symbolLocation":116,"imageIndex":1},{"imageOffset":4995768,"symbol":"FIRCLSSDKFileLog","symbolLocation":352,"imageIndex":1},{"imageOffset":5002920,"symbol":"FIRCLSMachExceptionServer","symbolLocation":976,"imageIndex":1},{"imageOffset":26096,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14663907,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":173735722090496},{"value":0},{"value":173735722090496},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":40451},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":173735722090496},{"value":0},{"value":173735722090496},{"value":6145138104},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6145137952},"sp":{"value":6145137872},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14664000,"name":"caulk.messenger.shared:17","threadState":{"x":[{"value":14},{"value":105553119456634},{"value":0},{"value":6149156970},{"value":105553119456608},{"value":25},{"value":0},{"value":0},{"value":0},{"value":4294967295},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":18446744073709551580},{"value":0},{"value":0},{"value":105553176953904},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":7360289596},"cpsr":{"value":2147487744},"fp":{"value":6149156736},"sp":{"value":6149156704},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355692},"far":{"value":0}},"frames":[{"imageOffset":2796,"symbol":"semaphore_wait_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":64316,"symbol":"caulk::semaphore::timed_wait(double)","symbolLocation":220,"imageIndex":13},{"imageOffset":93248,"symbol":"caulk::concurrent::details::worker_thread::run()","symbolLocation":28,"imageIndex":13},{"imageOffset":93364,"symbol":"void\* caulk::thread_proxy<std::**1::tuple<caulk::thread::attributes, void (caulk::concurrent::details::worker_thread::*)(), std::\_\_1::tuple<caulk::concurrent::details::worker_thread*>>>(void*)","symbolLocation":48,"imageIndex":13},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14664001,"name":"caulk.messenger.shared:high","threadState":{"x":[{"value":14},{"value":105553119516092},{"value":0},{"value":6149730412},{"value":105553119516064},{"value":27},{"value":0},{"value":0},{"value":0},{"value":4294967295},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":18446744073709551580},{"value":0},{"value":0},{"value":105553176954320},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":7360289596},"cpsr":{"value":2147487744},"fp":{"value":6149730176},"sp":{"value":6149730144},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355692},"far":{"value":0}},"frames":[{"imageOffset":2796,"symbol":"semaphore_wait_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":64316,"symbol":"caulk::semaphore::timed_wait(double)","symbolLocation":220,"imageIndex":13},{"imageOffset":93248,"symbol":"caulk::concurrent::details::worker_thread::run()","symbolLocation":28,"imageIndex":13},{"imageOffset":93364,"symbol":"void* caulk::thread_proxy<std::**1::tuple<caulk::thread::attributes, void (caulk::concurrent::details::worker_thread::\*)(), std::**1::tuple<caulk::concurrent::details::worker_thread*>>>(void*)","symbolLocation":48,"imageIndex":13},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14664185,"name":"com.apple.NSURLConnectionLoader","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":302378582540288},{"value":0},{"value":302378582540288},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":70403},{"value":3072},{"value":18446744073709551569},{"value":35184372097026},{"value":0},{"value":4294967295},{"value":2},{"value":302378582540288},{"value":0},{"value":302378582540288},{"value":6150872392},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6150872240},"sp":{"value":6150872160},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":2130160,"symbol":"+[__CFN_CoreSchedulingSetRunnable _run:]","symbolLocation":368,"imageIndex":14},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14666889,"name":"com.facebook.SocketRocket.NetworkThread","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":407931698806784},{"value":0},{"value":407931698806784},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":94979},{"value":3072},{"value":18446744073709551569},{"value":1586595279250178},{"value":0},{"value":4294967295},{"value":2},{"value":407931698806784},{"value":0},{"value":407931698806784},{"value":6139960680},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6139960528},"sp":{"value":6139960448},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":9735412,"symbol":"-[SRRunLoopThread main]","symbolLocation":224,"imageIndex":1},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14666891,"name":"com.apple.CFSocket.private","threadState":{"x":[{"value":4},{"value":0},{"value":105553116602112},{"value":0},{"value":0},{"value":0},{"value":140962168832},{"value":0},{"value":6140539104},{"value":0},{"value":5317573104},{"value":31},{"value":21},{"value":5317573424},{"value":72057602406436409,"symbolLocation":72057594037927937,"symbol":"OBJC_CLASS_$___NSCFArray"},{"value":8368508472,"symbolLocation":0,"symbol":"OBJC_CLASS_$**\_NSCFArray"},{"value":93},{"value":6446721588,"symbolLocation":0,"symbol":"-[**NSCFArray objectAtIndex:]"},{"value":0},{"value":8368530872,"symbolLocation":0,"symbol":"**CFActiveSocketsLock"},{"value":64},{"value":8153954552,"symbolLocation":0,"symbol":"**kCFNull"},{"value":0},{"value":0},{"value":105553116602112},{"value":6140538460},{"value":105553116602528},{"value":6140538460},{"value":105553130952320}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6446872484},"cpsr":{"value":1610616832},"fp":{"value":6140538816},"sp":{"value":6140505040},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422397848},"far":{"value":0}},"frames":[{"imageOffset":44952,"symbol":"__select","symbolLocation":8,"imageIndex":4},{"imageOffset":661412,"symbol":"__CFSocketManager","symbolLocation":680,"imageIndex":9},{"imageOffset":26096,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14666892,"name":"com.apple.CFStream.LegacyThread","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":413429256945664},{"value":0},{"value":413429256945664},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":96259},{"value":3072},{"value":18446744073709551569},{"value":1106108697800194},{"value":0},{"value":4294967295},{"value":2},{"value":413429256945664},{"value":0},{"value":413429256945664},{"value":6141108232},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6141108080},"sp":{"value":6141108000},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"__CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":724956,"symbol":"_legacyStreamRunLoop_workThread","symbolLocation":260,"imageIndex":9},{"imageOffset":26096,"symbol":"_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14667993,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":525613802717184},{"value":0},{"value":525613802717184},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":122379},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":525613802717184},{"value":0},{"value":525613802717184},{"value":6137093560},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6137093408},"sp":{"value":6137093328},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14668004,"name":"com.apple.CFNetwork.CustomProtocols","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":332099756228608},{"value":0},{"value":332099756228608},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":77323},{"value":3072},{"value":18446744073709551569},{"value":54975581401602},{"value":0},{"value":4294967295},{"value":2},{"value":332099756228608},{"value":0},{"value":332099756228608},{"value":6145711432},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6145711280},"sp":{"value":6145711200},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":2130160,"symbol":"+[**CFN_CoreSchedulingSetRunnable \_run:]","symbolLocation":368,"imageIndex":14},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14687400,"name":"com.apple.CoreMotion.MotionThread","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":296984103616512},{"value":0},{"value":296984103616512},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":69147},{"value":3072},{"value":18446744073709551569},{"value":8796093024258},{"value":0},{"value":4294967295},{"value":2},{"value":296984103616512},{"value":0},{"value":296984103616512},{"value":6144563496},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6144563344},"sp":{"value":6144563264},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":580512,"symbol":"CFRunLoopRun","symbolLocation":60,"imageIndex":9},{"imageOffset":1943992,"imageIndex":15},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14687401,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":648741925158912},{"value":0},{"value":648741925158912},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":151047},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":648741925158912},{"value":0},{"value":648741925158912},{"value":6143991224},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6143991072},"sp":{"value":6143990992},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14687414,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1112735832080384},{"value":0},{"value":1112735832080384},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":259079},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1112735832080384},{"value":0},{"value":1112735832080384},{"value":6153739704},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6153739552},"sp":{"value":6153739472},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14689662,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":475053447708672},{"value":0},{"value":475053447708672},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":110607},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":475053447708672},{"value":0},{"value":475053447708672},{"value":6138240440},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6138240288},"sp":{"value":6138240208},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14689674,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1075369616605184},{"value":0},{"value":1075369616605184},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":250379},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1075369616605184},{"value":0},{"value":1075369616605184},{"value":6143401400},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6143401248},"sp":{"value":6143401168},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14689691,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":614691424436224},{"value":0},{"value":614691424436224},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":143119},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":614691424436224},{"value":0},{"value":614691424436224},{"value":6142827960},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6142827808},"sp":{"value":6142827728},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14689693,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":624587029086208},{"value":0},{"value":624587029086208},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":145423},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":624587029086208},{"value":0},{"value":624587029086208},{"value":6155460024},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6155459872},"sp":{"value":6155459792},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14689696,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":711448447680512},{"value":0},{"value":711448447680512},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":165647},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":711448447680512},{"value":0},{"value":711448447680512},{"value":6156033464},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6156033312},"sp":{"value":6156033232},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14691915,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":647711133007872},{"value":0},{"value":647711133007872},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":150807},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":647711133007872},{"value":0},{"value":647711133007872},{"value":6148578744},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6148578592},"sp":{"value":6148578512},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14691928,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":561038692974592},{"value":0},{"value":561038692974592},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":130627},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":561038692974592},{"value":0},{"value":561038692974592},{"value":6157753784},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6157753632},"sp":{"value":6157753552},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14691948,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":653208691146752},{"value":0},{"value":653208691146752},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":152087},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":653208691146752},{"value":0},{"value":653208691146752},{"value":6146284984},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6146284832},"sp":{"value":6146284752},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14691959,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":343541549105152},{"value":0},{"value":343541549105152},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":79987},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":343541549105152},{"value":0},{"value":343541549105152},{"value":6146858424},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6146858272},"sp":{"value":6146858192},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14691998,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":687448170430464},{"value":0},{"value":687448170430464},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":160059},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":687448170430464},{"value":0},{"value":687448170430464},{"value":6147431864},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6147431712},"sp":{"value":6147431632},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14750209,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":654308202774528},{"value":0},{"value":654308202774528},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":152343},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":654308202774528},{"value":0},{"value":654308202774528},{"value":6152019384},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6152019232},"sp":{"value":6152019152},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14762181,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":715915213668352},{"value":0},{"value":715915213668352},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":166687},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":715915213668352},{"value":0},{"value":715915213668352},{"value":6148005304},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6148005152},"sp":{"value":6148005072},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14762286,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1142422646030336},{"value":0},{"value":1142422646030336},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":265991},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1142422646030336},{"value":0},{"value":1142422646030336},{"value":6150299064},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6150298912},"sp":{"value":6150298832},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14763023,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1238131697254400},{"value":0},{"value":1238131697254400},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":288275},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1238131697254400},{"value":0},{"value":1238131697254400},{"value":6152592824},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6152592672},"sp":{"value":6152592592},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14763044,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":814836900429824},{"value":0},{"value":814836900429824},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":189719},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":814836900429824},{"value":0},{"value":814836900429824},{"value":6161767864},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6161767712},"sp":{"value":6161767632},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14765245,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":305831736246272},{"value":0},{"value":305831736246272},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":71207},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":305831736246272},{"value":0},{"value":305831736246272},{"value":6136520120},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6136519968},"sp":{"value":6136519888},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14765314,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":804958475649024},{"value":0},{"value":804958475649024},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":187419},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":804958475649024},{"value":0},{"value":804958475649024},{"value":6154886584},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6154886432},"sp":{"value":6154886352},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14766364,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1066625063190528},{"value":0},{"value":1066625063190528},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":248343},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1066625063190528},{"value":0},{"value":1066625063190528},{"value":6154313144},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6154312992},"sp":{"value":6154312912},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14766429,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":404804962615296},{"value":0},{"value":404804962615296},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":94251},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":404804962615296},{"value":0},{"value":404804962615296},{"value":6158900664},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6158900512},"sp":{"value":6158900432},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14799377,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":784119294328832},{"value":0},{"value":784119294328832},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":182567},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":784119294328832},{"value":0},{"value":784119294328832},{"value":6159474104},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6159473952},"sp":{"value":6159473872},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14838525,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":865483154784256},{"value":0},{"value":865483154784256},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":201511},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":865483154784256},{"value":0},{"value":865483154784256},{"value":6141681080},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6141680928},"sp":{"value":6141680848},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14975467,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":432309933178880},{"value":0},{"value":432309933178880},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":100655},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":432309933178880},{"value":0},{"value":432309933178880},{"value":6137667000},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6137666848},"sp":{"value":6137666768},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14975488,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":912693435301888},{"value":0},{"value":912693435301888},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":212503},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":912693435301888},{"value":0},{"value":912693435301888},{"value":6163488184},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6163488032},"sp":{"value":6163487952},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14975498,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":881872749985792},{"value":0},{"value":881872749985792},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":205327},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":881872749985792},{"value":0},{"value":881872749985792},{"value":6169222584},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6169222432},"sp":{"value":6169222352},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14975506,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1386617306611712},{"value":0},{"value":1386617306611712},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":322847},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1386617306611712},{"value":0},{"value":1386617306611712},{"value":6164061624},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6164061472},"sp":{"value":6164061392},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":14975522,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":591721939337216},{"value":0},{"value":591721939337216},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":137771},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":591721939337216},{"value":0},{"value":591721939337216},{"value":6157180344},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6157180192},"sp":{"value":6157180112},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15042501,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":775202942222336},{"value":0},{"value":775202942222336},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":180491},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":775202942222336},{"value":0},{"value":775202942222336},{"value":6162341304},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6162341152},"sp":{"value":6162341072},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15052363,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1103922559188992},{"value":0},{"value":1103922559188992},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":257027},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1103922559188992},{"value":0},{"value":1103922559188992},{"value":6158327224},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6158327072},"sp":{"value":6158326992},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15052388,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1458154281893888},{"value":0},{"value":1458154281893888},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":339503},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1458154281893888},{"value":0},{"value":1458154281893888},{"value":6160620984},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6160620832},"sp":{"value":6160620752},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15053369,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":454300165734400},{"value":0},{"value":454300165734400},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":105775},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":454300165734400},{"value":0},{"value":454300165734400},{"value":6166928824},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6166928672},"sp":{"value":6166928592},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15053445,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1003145446555648},{"value":0},{"value":1003145446555648},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":233563},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1003145446555648},{"value":0},{"value":1003145446555648},{"value":6171516344},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6171516192},"sp":{"value":6171516112},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15069637,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":867544739086336},{"value":0},{"value":867544739086336},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":201991},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":867544739086336},{"value":0},{"value":867544739086336},{"value":6160047544},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6160047392},"sp":{"value":6160047312},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15079929,"name":"com.facebook.react.runtime.JavaScript","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":783071322308608},{"value":0},{"value":783071322308608},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":182323},{"value":3072},{"value":18446744073709551569},{"value":115448720943362},{"value":0},{"value":4294967295},{"value":2},{"value":783071322308608},{"value":0},{"value":783071322308608},{"value":6156606920},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6156606768},"sp":{"value":6156606688},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":8734868,"symbol":"+[RCTJSThreadManager runRunLoop]","symbolLocation":212,"imageIndex":1},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15079930,"name":"hades","threadState":{"x":[{"value":260},{"value":0},{"value":0},{"value":0},{"value":0},{"value":160},{"value":0},{"value":0},{"value":6164639400},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":0},{"value":0},{"value":105553172073744},{"value":105553172073808},{"value":6164639968},{"value":0},{"value":0},{"value":0},{"value":1},{"value":256},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4420577976},"cpsr":{"value":1610616832},"fp":{"value":6164639520},"sp":{"value":6164639376},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422369300},"far":{"value":0}},"frames":[{"imageOffset":16404,"symbol":"**psynch_cvwait","symbolLocation":8,"imageIndex":4},{"imageOffset":27320,"symbol":"\_pthread_cond_wait","symbolLocation":976,"imageIndex":5},{"imageOffset":131928,"symbol":"std::**1::condition_variable::wait(std::**1::unique_lock<std::**1::mutex>&)","symbolLocation":28,"imageIndex":16},{"imageOffset":1385292,"symbol":"hermes::vm::HadesGC::Executor::worker()","symbolLocation":116,"imageIndex":2},{"imageOffset":1385140,"symbol":"void* std::**1::**thread_proxy[abi:nn180100]<std::**1::tuple<std::**1::unique_ptr<std::**1::**thread_struct, std::**1::default_delete<std::**1::\_\_thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*)","symbolLocation":44,"imageIndex":2},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15080002,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1148246621683712},{"value":0},{"value":1148246621683712},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":267347},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1148246621683712},{"value":0},{"value":1148246621683712},{"value":6142254520},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6142254368},"sp":{"value":6142254288},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15080011,"name":"hades","threadState":{"x":[{"value":260},{"value":0},{"value":0},{"value":0},{"value":0},{"value":160},{"value":0},{"value":0},{"value":6174961320},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":0},{"value":0},{"value":105553171959584},{"value":105553171959648},{"value":6174961888},{"value":0},{"value":0},{"value":0},{"value":1},{"value":256},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4420577976},"cpsr":{"value":1610616832},"fp":{"value":6174961440},"sp":{"value":6174961296},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422369300},"far":{"value":0}},"frames":[{"imageOffset":16404,"symbol":"**psynch_cvwait","symbolLocation":8,"imageIndex":4},{"imageOffset":27320,"symbol":"\_pthread_cond_wait","symbolLocation":976,"imageIndex":5},{"imageOffset":131928,"symbol":"std::**1::condition_variable::wait(std::**1::unique_lock<std::**1::mutex>&)","symbolLocation":28,"imageIndex":16},{"imageOffset":1385292,"symbol":"hermes::vm::HadesGC::Executor::worker()","symbolLocation":116,"imageIndex":2},{"imageOffset":1385140,"symbol":"void\* std::**1::**thread_proxy[abi:nn180100]<std::**1::tuple<std::**1::unique_ptr<std::**1::**thread_struct, std::**1::default_delete<std::**1::**thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*)","symbolLocation":44,"imageIndex":2},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15080026,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":761201348837376},{"value":0},{"value":761201348837376},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":177231},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":761201348837376},{"value":0},{"value":761201348837376},{"value":6167502264},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6167502112},"sp":{"value":6167502032},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15095939,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":893005305217024},{"value":0},{"value":893005305217024},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":207919},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":893005305217024},{"value":0},{"value":893005305217024},{"value":6170369464},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6170369312},"sp":{"value":6170369232},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":15615863,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1438483331678208},{"value":0},{"value":1438483331678208},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":334923},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1438483331678208},{"value":0},{"value":1438483331678208},{"value":6172089784},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6172089632},"sp":{"value":6172089552},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":16239409,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1541631266258944},{"value":0},{"value":1541631266258944},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":358939},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1541631266258944},{"value":0},{"value":1541631266258944},{"value":6166355384},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6166355232},"sp":{"value":6166355152},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":16299259,"frames":[{"imageOffset":6532,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":5}],"threadState":{"x":[{"value":6151450624},{"value":179107},{"value":6150914048},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6151450624},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4420557188},"far":{"value":0}}},{"triggered":true,"id":16300184,"name":"com.facebook.react.runtime.JavaScript","threadState":{"x":[{"value":4929539408},{"value":4929539424},{"value":4929539656},{"value":4929539680},{"value":4420817568,"symbolLocation":352,"symbol":"_platform_memset_pattern16"},{"value":4420817568,"symbolLocation":352,"symbol":"_platform_memset_pattern16"},{"value":6165207048},{"value":3440},{"value":105553183874400},{"value":209653907234144},{"value":0},{"value":9408},{"value":2043},{"value":2045},{"value":2365792551},{"value":2363693457},{"value":2365587456},{"value":295},{"value":0},{"value":4425221648},{"value":4425221968},{"value":252525460136583},{"value":105553171982304},{"value":105553156732152},{"value":3},{"value":18446744073709551615},{"value":336789709},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4340141724},"cpsr":{"value":1610616832},"fp":{"value":6165208080},"sp":{"value":6165208032},"esr":{"value":2449473540,"description":"(Data Abort) byte read Translation fault"},"pc":{"value":4338515960,"matchesCrashFrame":1},"far":{"value":209653907234168}},"frames":[{"imageOffset":7602168,"symbol":"std::**1::**function::**func<facebook::react::Scheduler::uiManagerDidDispatchCommand(std::**1::shared_ptr<facebook::react::ShadowNode const> const&, std::**1::basic_string<char, std::**1::char_traits<char>, std::**1::allocator<char>> const&, folly::dynamic const&)::$\_0, std::**1::allocator<facebook::react::Scheduler::uiManagerDidDispatchCommand(std::**1::shared_ptr<facebook::react::ShadowNode const> const&, std::**1::basic_string<char, std::**1::char_traits<char>, std::**1::allocator<char>> const&, folly::dynamic const&)::$_0>, void ()>::operator()()","symbolLocation":20,"imageIndex":1},{"imageOffset":9227932,"symbol":"facebook::react::RuntimeScheduler_Modern::updateRendering()","symbolLocation":140,"imageIndex":1},{"imageOffset":9226988,"symbol":"facebook::react::RuntimeScheduler_Modern::runEventLoopTick(facebook::jsi::Runtime&, facebook::react::Task&, std::__1::chrono::time_point<std::__1::chrono::steady_clock, std::__1::chrono::duration<long long, std::__1::ratio<1l, 1000000000l>>>)","symbolLocation":228,"imageIndex":1},{"imageOffset":9226208,"symbol":"facebook::react::RuntimeScheduler_Modern::runEventLoop(facebook::jsi::Runtime&, bool)","symbolLocation":148,"imageIndex":1},{"imageOffset":8752004,"symbol":"_ZNSt3__110__function6__funcIZZN8facebook5react13ReactInstanceC1ENS_10unique_ptrINS3_9JSRuntimeENS_14default_deleteIS6_EEEENS_10shared_ptrINS3_18MessageQueueThreadEEENSA_INS3_12TimerManagerEEENS_8functionIFvRNS2_3jsi7RuntimeERKNS3_14JsErrorHandler14ProcessedErrorEEEEPNS3_18jsinspector_modern10HostTargetEENK3$\_0clINSF_IFvSI_EEEEEDaT_EUlvE_NS_9allocatorISY_EEFvvEEclEv","symbolLocation":116,"imageIndex":1},{"imageOffset":6768544,"symbol":"facebook::react::tryAndReturnError(std::**1::function<void ()> const&)","symbolLocation":32,"imageIndex":1},{"imageOffset":6836892,"symbol":"facebook::react::RCTMessageThread::tryFunc(std::**1::function<void ()> const&)","symbolLocation":24,"imageIndex":1},{"imageOffset":6836384,"symbol":"invocation function for block in facebook::react::RCTMessageThread::runAsync(std::**1::function<void ()>)","symbolLocation":44,"imageIndex":1},{"imageOffset":602420,"symbol":"**CFRUNLOOP_IS_CALLING_OUT_TO_A_BLOCK**","symbolLocation":20,"imageIndex":9},{"imageOffset":600216,"symbol":"**CFRunLoopDoBlocks","symbolLocation":348,"imageIndex":9},{"imageOffset":580140,"symbol":"**CFRunLoopRun","symbolLocation":2308,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":8734868,"symbol":"+[RCTJSThreadManager runRunLoop]","symbolLocation":212,"imageIndex":1},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":16300185,"name":"hades","threadState":{"x":[{"value":260},{"value":0},{"value":512},{"value":0},{"value":0},{"value":160},{"value":0},{"value":0},{"value":6165786280},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":2},{"value":0},{"value":105553171988288},{"value":105553171988352},{"value":6165786848},{"value":0},{"value":0},{"value":512},{"value":513},{"value":768},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4420577976},"cpsr":{"value":1610616832},"fp":{"value":6165786400},"sp":{"value":6165786256},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422369300},"far":{"value":0}},"frames":[{"imageOffset":16404,"symbol":"**psynch_cvwait","symbolLocation":8,"imageIndex":4},{"imageOffset":27320,"symbol":"\_pthread_cond_wait","symbolLocation":976,"imageIndex":5},{"imageOffset":131928,"symbol":"std::**1::condition_variable::wait(std::**1::unique_lock<std::**1::mutex>&)","symbolLocation":28,"imageIndex":16},{"imageOffset":1385292,"symbol":"hermes::vm::HadesGC::Executor::worker()","symbolLocation":116,"imageIndex":2},{"imageOffset":1385140,"symbol":"void* std::**1::**thread_proxy[abi:nn180100]<std::**1::tuple<std::**1::unique_ptr<std::**1::**thread_struct, std::**1::default_delete<std::**1::**thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void\*)","symbolLocation":44,"imageIndex":2},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":16300198,"frames":[{"imageOffset":6532,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":5}],"threadState":{"x":[{"value":6168080384},{"value":229055},{"value":6167543808},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6168080384},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4420557188},"far":{"value":0}}},{"id":16300208,"name":"AXSpeech","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592},{"value":1281047010476032},{"value":0},{"value":1281047010476032},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":298267},{"value":3072},{"value":18446744073709551569},{"value":2},{"value":0},{"value":4294967295},{"value":2},{"value":1281047010476032},{"value":0},{"value":1281047010476032},{"value":6173236664},{"value":8589934592},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4422426540},"cpsr":{"value":4096},"fp":{"value":6173236512},"sp":{"value":6173236432},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4422355824},"far":{"value":0}},"frames":[{"imageOffset":2928,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":4},{"imageOffset":73644,"symbol":"mach_msg2_internal","symbolLocation":72,"imageIndex":4},{"imageOffset":35880,"symbol":"mach_msg_overwrite","symbolLocation":480,"imageIndex":4},{"imageOffset":3800,"symbol":"mach_msg","symbolLocation":20,"imageIndex":4},{"imageOffset":601028,"symbol":"**CFRunLoopServiceMachPort","symbolLocation":156,"imageIndex":9},{"imageOffset":578980,"symbol":"**CFRunLoopRun","symbolLocation":1148,"imageIndex":9},{"imageOffset":576748,"symbol":"CFRunLoopRunSpecific","symbolLocation":536,"imageIndex":9},{"imageOffset":7213964,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":208,"imageIndex":7},{"imageOffset":172280,"imageIndex":12},{"imageOffset":7373128,"symbol":"**NSThread**start**","symbolLocation":716,"imageIndex":7},{"imageOffset":26096,"symbol":"\_pthread_start","symbolLocation":104,"imageIndex":5},{"imageOffset":6552,"symbol":"thread_start","symbolLocation":8,"imageIndex":5}]},{"id":16300209,"frames":[{"imageOffset":6532,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":5}],"threadState":{"x":[{"value":6173814784},{"value":188211},{"value":6173278208},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6173814784},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4420557188},"far":{"value":0}}}],
"usedImages" : [
{
"source" : "P",
"arch" : "arm64e",
"base" : 4421107712,
"size" : 638976,
"uuid" : "3247e185-ced2-36ff-9e29-47a77c23e004",
"path" : "\/usr\/lib\/dyld",
"name" : "dyld"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 4330913792,
"CFBundleShortVersionString" : "2.33.13",
"CFBundleIdentifier" : "host.exp.Exponent",
"size" : 38846464,
"uuid" : "1cbadbc4-db5b-3fab-b22b-549dcf6c2c24",
"path" : "\/Users\/USER\/Library\/Developer\/CoreSimulator\/Devices\/61D71778-D7FB-45DD-912F-FC0C387DE910\/data\/Containers\/Bundle\/Application\/887DD1DC-A814-4BF0-87F8-2B0352948750\/Exponent-2.33.13.tar.app\/Expo Go",
"name" : "Expo Go",
"CFBundleVersion" : "2.33.13"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 4437852160,
"CFBundleShortVersionString" : "0.12.0",
"CFBundleIdentifier" : "dev.hermesengine.iphonesimulator",
"size" : 2703360,
"uuid" : "540cccf0-83c0-3fe1-a1df-264c31bc09ba",
"path" : "\/Users\/USER\/Library\/Developer\/CoreSimulator\/Devices\/61D71778-D7FB-45DD-912F-FC0C387DE910\/data\/Containers\/Bundle\/Application\/887DD1DC-A814-4BF0-87F8-2B0352948750\/Exponent-2.33.13.tar.app\/Frameworks\/hermes.framework\/hermes",
"name" : "hermes",
"CFBundleVersion" : "0.12.0"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 4420812800,
"size" : 32768,
"uuid" : "43ef9892-7edb-34c5-88d6-2c79fa2e7bd3",
"path" : "\/usr\/lib\/system\/libsystem_platform.dylib",
"name" : "libsystem_platform.dylib"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 4422352896,
"size" : 245760,
"uuid" : "0960cf7e-fb2e-3068-998e-131a316ed666",
"path" : "\/usr\/lib\/system\/libsystem_kernel.dylib",
"name" : "libsystem_kernel.dylib"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 4420550656,
"size" : 65536,
"uuid" : "421e2342-6729-3a9f-a439-29ad130875b3",
"path" : "\/usr\/lib\/system\/libsystem_pthread.dylib",
"name" : "libsystem_pthread.dylib"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 4424908800,
"size" : 49152,
"uuid" : "56878cbd-4b61-3d67-a830-23a1b2beaf59",
"path" : "\/Volumes\/VOLUME\/*\/libobjc-trampolines.dylib",
"name" : "libobjc-trampolines.dylib"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 6451023872,
"CFBundleShortVersionString" : "6.9",
"CFBundleIdentifier" : "com.apple.Foundation",
"size" : 12254784,
"uuid" : "48eb0271-c8d1-359a-bd56-bcf3e7e37dc5",
"path" : "\/Volumes\/VOLUME\/*\/Foundation.framework\/Foundation",
"name" : "Foundation",
"CFBundleVersion" : "3502"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 6524219392,
"CFBundleShortVersionString" : "1.0",
"CFBundleIdentifier" : "com.apple.UIKitCore",
"size" : 30851776,
"uuid" : "f5406608-aa34-30ba-8494-0a8b531792f5",
"path" : "\/Volumes\/VOLUME\/*\/UIKitCore.framework\/UIKitCore",
"name" : "UIKitCore",
"CFBundleVersion" : "8506.1.101"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 6446211072,
"CFBundleShortVersionString" : "6.9",
"CFBundleIdentifier" : "com.apple.CoreFoundation",
"size" : 4292608,
"uuid" : "ae27f481-c1fa-359c-b04c-af9cda7655ff",
"path" : "\/Volumes\/VOLUME\/*\/CoreFoundation.framework\/CoreFoundation",
"name" : "CoreFoundation",
"CFBundleVersion" : "3502"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 6727671808,
"CFBundleShortVersionString" : "1.0",
"CFBundleIdentifier" : "com.apple.GraphicsServices",
"size" : 33280,
"uuid" : "80b30bb2-e6e1-317e-b798-ea590de713a8",
"path" : "\/Volumes\/VOLUME\/*\/GraphicsServices.framework\/GraphicsServices",
"name" : "GraphicsServices",
"CFBundleVersion" : "1.0"
},
{
"size" : 0,
"source" : "A",
"base" : 0,
"uuid" : "00000000-0000-0000-0000-000000000000"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 7361056768,
"CFBundleShortVersionString" : "1.0.0",
"CFBundleIdentifier" : "com.apple.texttospeech",
"size" : 1925088,
"uuid" : "a1620dc8-7943-3238-9daa-dc6d73391990",
"path" : "\/Volumes\/VOLUME\/*\/TextToSpeech.framework\/TextToSpeech",
"name" : "TextToSpeech",
"CFBundleVersion" : "1.0"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 7360225280,
"CFBundleShortVersionString" : "1.0",
"CFBundleIdentifier" : "com.apple.audio.caulk",
"size" : 153056,
"uuid" : "7f22c3c4-1a93-34dd-bf46-522f8d2a0e77",
"path" : "\/Volumes\/VOLUME\/*\/caulk.framework\/caulk",
"name" : "caulk"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 6519136256,
"CFBundleShortVersionString" : "1.0",
"CFBundleIdentifier" : "com.apple.CFNetwork",
"size" : 3676576,
"uuid" : "a726149c-9657-391f-bfdd-fd9ed415d3cc",
"path" : "\/Volumes\/VOLUME\/*\/CFNetwork.framework\/CFNetwork",
"name" : "CFNetwork",
"CFBundleVersion" : "3826.500.131"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 6789308416,
"CFBundleShortVersionString" : "2964.0.4",
"CFBundleIdentifier" : "com.apple.coremotion",
"size" : 3591136,
"uuid" : "8e2bb204-90e0-33b1-adce-d0cda263d89d",
"path" : "\/Volumes\/VOLUME\/*\/CoreMotion.framework\/CoreMotion",
"name" : "CoreMotion",
"CFBundleVersion" : "2964.0.4"
},
{
"source" : "P",
"arch" : "arm64",
"base" : 6445514752,
"size" : 544764,
"uuid" : "b81f25b5-2a12-36cd-84e2-b8c80df7d07b",
"path" : "\/Volumes\/VOLUME\/*\/libc++.1.dylib",
"name" : "libc++.1.dylib"
}
],
"sharedCache" : {
"base" : 6442450944,
"size" : 3915153408,
"uuid" : "a54cacfd-a68d-3536-b68b-33e6df11923b"
},
"vmSummary" : "ReadOnly portion of Libraries: Total=1.8G resident=0K(0%) swapped_out_or_unallocated=1.8G(100%)\nWritable regions: Total=1.0G written=3434K(0%) resident=2554K(0%) swapped_out=880K(0%) unallocated=1.0G(100%)\n\n VIRTUAL REGION \nREGION TYPE SIZE COUNT (non-coalesced) \n=========== ======= ======= \nAccelerate framework 128K 1 \nActivity Tracing 256K 1 \nCG image 4112K 1 \nCG raster data 16.9M 173 \nColorSync 160K 7 \nCoreAnimation 16.5M 316 \nFoundation 7072K 3 \nKernel Alloc Once 32K 1 \nMALLOC 945.0M 262 \nMALLOC guard page 192K 12 \nMach message 16K 1 \nSQLite page cache 1152K 9 \nSTACK GUARD 56.9M 60 \nStack 39.3M 61 \nVM_ALLOCATE 51.9M 50 \n**DATA 46.4M 908 \n**DATA_CONST 114.5M 932 \n**DATA_DIRTY 91K 11 \n**FONT_DATA 2352 1 \n**LINKEDIT 732.7M 8 \n**OBJC_RO 61.3M 1 \n**OBJC_RW 2727K 1 \n**TEXT 1.1G 949 \n\_\_TPRO_CONST 148K 2 \ndyld private memory 2.5G 24 \nlibnetwork 640K 16 \nmapped file 406.2M 149 \npage table in kernel 2554K 1 \nshared memory 16K 1 \n=========== ======= ======= \nTOTAL 6.0G 3962 \n",
"legacyInfo" : {
"threadTriggered" : {
"name" : "com.facebook.react.runtime.JavaScript"
}
},
"logWritingSignature" : "4748eacbee346d62fe854da911778a2a888265d0",
"trialInfo" : {
"rollouts" : [
{
"rolloutId" : "648cada15dbc71671bb3aa1b",
"factorPackIds" : {
"SIRI_EXPERIENCE_CAM" : "65a81173096f6a1f1ba46525"
},
"deploymentId" : 240000116
},
{
"rolloutId" : "652eff3d1bce5442b8d753c9",
"factorPackIds" : {

      },
      "deploymentId" : 240000009
    }

],
"experiments" : [

]
}
}
