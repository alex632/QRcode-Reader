# QRcode-Reader
A simple QRcode-Reader App I made for training purpose.

## Environment
- node	8.9.4
- npm	5.6.0
- cordova 8.0.0 buggy with cordova-plugin-swift-support
- cordova 7.1.0

## Platforms
### Installed platforms
- browser 5.0.3
- ios 4.5.4

Android maybe someday!

### Available platforms

- android ~7.0.0
- osx ~4.0.1
- windows ~5.0.0
- www ^3.12.0

## Plugins
- cordova-plugin-whitelist 1.3.3 "Whitelist"
- cordova-plugin-inappbrowser 2.0.2 "InAppBrowser"
- phonegap-plugin-barcodescanner 7.0.2 "BarcodeScanner"

Refer to: [phonegap/phonegap-plugin-barcodescanner: cross-platform BarcodeScanner for Cordova / PhoneGap](https://github.com/phonegap/phonegap-plugin-barcodescanner)

不是很優，拖了老半天才顯示Scanner，還以為掛了。

- cordova-plugin-qrscanner 2.5.0 "QRScanner"
- cordova-plugin-swift-support 3.1.1 "SwiftSupport"  `required by "QRScanner"`
```
cordova plugin add cordova-plugin-inappbrowser cordova-plugin-qrscanner
cordova plugin add phonegap-plugin-barcodescanner --variable CAMERA_USAGE_DESCRIPTION="Scan barcodes/QRcodes"
```
## How to build
```
cordova build ios --release --browserify
```
--browserify can do any good?

In Xcode, open platforms/ios/QRcode Reader.xcworkspace

## Open Source don't care about backward compatibility
Who knows the shit below? A bug of cordova 8.0.0.

> D:\cordova\QRcode Reader>cordova run browser

> (node:576932) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Cannot find module '../cordova/platform_metadata'

> (node:576932) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

It turns out to be add/remove all plugin. WTF?
