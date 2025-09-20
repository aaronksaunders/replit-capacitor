# Mobile App Setup Guide

## 📱 Overview

This guide covers setting up the mobile app for iOS and Android development using Ionic Capacitor.

## 🛠️ Prerequisites

### iOS Development
- **macOS**: Required for iOS development
- **Xcode**: Latest version from App Store
- **iOS Simulator**: Included with Xcode
- **CocoaPods**: `sudo gem install cocoapods`

### Android Development
- **Android Studio**: Latest version
- **Android SDK**: API level 33+ (Android 13+)
- **Java Development Kit**: JDK 11 or higher
- **Android Emulator**: Set up through Android Studio

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Mobile
```bash
npm run build:mobile
```

### 3. Sync with Capacitor
```bash
npm run cap:sync
```

## 📱 iOS Setup

### 1. Open iOS Project
```bash
npm run cap:open:ios
```

### 2. Configure in Xcode
1. Select your development team
2. Set bundle identifier
3. Configure signing & capabilities
4. Set deployment target (iOS 13+)

### 3. Run on Simulator
```bash
npm run cap:run:ios
```

### 4. Run on Device
1. Connect iOS device via USB
2. Trust computer on device
3. Select device in Xcode
4. Build and run

## 🤖 Android Setup

### 1. Open Android Project
```bash
npm run cap:open:android
```

### 2. Configure in Android Studio
1. Open `android/` folder
2. Sync project with Gradle files
3. Set up signing configuration
4. Configure build variants

### 3. Run on Emulator
```bash
npm run cap:run:android
```

### 4. Run on Device
1. Enable Developer Options on device
2. Enable USB Debugging
3. Connect device via USB
4. Build and run

## 🔧 Configuration

### Capacitor Configuration
```typescript
// capacitor.config.ts
export default {
  appId: 'com.yourcompany.jwt-auth-demo',
  appName: 'JWT Auth Demo',
  webDir: 'dist-mobile',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff'
    }
  }
}
```

### Environment Variables
```bash
# .env
VITE_MOBILE_API_URL=https://your-server.com
```

## 🔒 Security Features

### Secure Storage
- **iOS**: Uses Keychain Services
- **Android**: Uses Android Keystore
- **Implementation**: `@aparajita/capacitor-secure-storage`

### Safe Area Handling
- **Plugin**: `@capacitor-community/safe-area`
- **Features**: Notch, status bar, home indicator support
- **CSS Variables**: `--safe-area-inset-*`

### Platform Detection
```typescript
import { Capacitor } from '@capacitor/core';

if (Capacitor.isNativePlatform()) {
  // Mobile-specific code
  const platform = Capacitor.getPlatform(); // 'ios' or 'android'
}
```

## 📦 Build Process

### Development Build
```bash
# Build and sync
npm run build:mobile
npm run cap:sync

# Run on device
npm run cap:run:ios
npm run cap:run:android
```

### Production Build
```bash
# Build for production
npm run build:mobile

# Sync with native projects
npm run cap:sync

# Build in Xcode/Android Studio
# Archive and distribute
```

## 🧪 Testing

### iOS Testing
1. **Simulator**: Test on different device sizes
2. **Device**: Test on physical iOS devices
3. **TestFlight**: Distribute beta versions
4. **Xcode Instruments**: Performance testing

### Android Testing
1. **Emulator**: Test on different Android versions
2. **Device**: Test on physical Android devices
3. **Play Console**: Internal testing
4. **Android Studio Profiler**: Performance testing

## 🚀 Deployment

### iOS App Store
1. Archive app in Xcode
2. Upload to App Store Connect
3. Submit for review
4. Release to App Store

### Google Play Store
1. Generate signed APK/AAB
2. Upload to Play Console
3. Submit for review
4. Release to Play Store

## 🔧 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clean and rebuild
rm -rf node_modules
npm install
npm run build:mobile
npm run cap:sync
```

#### iOS Issues
- **Code signing**: Check team and certificates
- **Simulator**: Reset simulator if needed
- **Pods**: Run `cd ios && pod install`

#### Android Issues
- **Gradle**: Clean and rebuild project
- **SDK**: Check Android SDK installation
- **Emulator**: Create new AVD if needed

#### Plugin Issues
```bash
# Check plugin status
npx cap doctor

# Reinstall plugins
npm install
npm run cap:sync
```

### Debug Commands
```bash
# Check Capacitor status
npx cap doctor

# List installed plugins
npx cap ls

# Check platform requirements
npx cap check ios
npx cap check android
```

## 📚 Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Development Guide](https://developer.apple.com/ios/)
- [Android Development Guide](https://developer.android.com/)
- [Safe Area Plugin](https://github.com/capacitor-community/safe-area)
- [Secure Storage Plugin](https://github.com/aparajita/capacitor-secure-storage)

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Capacitor documentation
3. Check platform-specific guides
4. Look at the project's GitHub issues
5. Ask for help in the community forums