# QRcode-Reader
A simple QRcode-Reader App I made for training purpose.

## Platforms
### Installed platforms:
- ios 4.5.4

Android maybe someday!

### Available platforms:

- android ~7.0.0
- browser ~5.0.1
- osx ~4.0.1
- windows ~5.0.0
- www ^3.12.0

## Plugins
- cordova-plugin-inappbrowser 2.0.1 "InAppBrowser"
```
cordova plugin add cordova-plugin-inappbrowser --save
```
- cordova-plugin-whitelist 1.3.3 "Whitelist"
- phonegap-plugin-barcodescanner 7.0.2 "BarcodeScanner"
```
cordova plugin add phonegap-plugin-barcodescanner --save --variable CAMERA_USAGE_DESCRIPTION="To scan barcodes"
```
Refer to: [phonegap/phonegap-plugin-barcodescanner: cross-platform BarcodeScanner for Cordova / PhoneGap](https://github.com/phonegap/phonegap-plugin-barcodescanner)

不是很優，拖了老半天才顯示Scanner，還以為掛了。

## How to build
```
cordova build ios --release
```
In Xcode, open platforms/ios/xx.xcworkshop
