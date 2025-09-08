# Mobile App Setup Guide

This guide explains how to configure the mobile app for different environments.

## Environment Variables

The app uses different API URLs based on the platform:

- **Web (Replit)**: Uses relative URLs for development
- **Mobile**: Uses absolute URLs for native app communication

### Setting Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# For web development (Replit)
VITE_API_URL=http://localhost:5000

# For mobile development
# Replace with your actual server URL when deploying
VITE_MOBILE_API_URL=https://your-server.com
```

### For Production Deployment

1. **Set the mobile API URL** to your production server:
   ```bash
   VITE_MOBILE_API_URL=https://your-production-server.com
   ```

2. **Build the mobile app**:
   ```bash
   npm run build:mobile
   npx cap sync
   ```

3. **Run on device**:
   ```bash
   # iOS
   npm run cap:run:ios
   
   # Android
   npm run cap:run:android
   ```

## API Configuration

The app automatically detects the platform and uses the appropriate API configuration:

- **Web**: Uses relative URLs (e.g., `/api/login`)
- **Mobile**: Uses absolute URLs (e.g., `https://your-server.com/api/login`)

## Security Features

- **JWT Tokens**: Stored securely using iOS Keychain and Android Keystore
- **API Communication**: Uses HTTPS for mobile devices
- **Platform Detection**: Automatically adapts behavior based on platform

## Development Workflow

1. **Web Development**: 
   - Uses Replit's built-in server
   - No additional configuration needed

2. **Mobile Development**:
   - Set `VITE_MOBILE_API_URL` to your development server
   - Build and sync with `npm run build:mobile && npx cap sync`
   - Test on device with `npm run cap:run:ios` or `npm run cap:run:android`

## Troubleshooting

- **API Connection Issues**: Check that `VITE_MOBILE_API_URL` is set correctly
- **Build Errors**: Ensure all environment variables are properly configured
- **Secure Storage Issues**: Verify that the app is running on a physical device (not simulator)
