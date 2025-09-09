# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
# Edit .env with your mobile API URL
```

### 3. Set Up Database
```bash
npm run db:generate
npm run db:migrate
```

### 4. Start Development
```bash
# Web development
npm run dev

# Mobile development (in separate terminal)
npm run build:mobile
npm run cap:sync
npm run cap:open:ios  # or cap:open:android
```

## 📱 Mobile Development

### iOS Setup
1. Install Xcode from App Store
2. Install iOS Simulator
3. Run: `npm run cap:open:ios`
4. Build and run in Xcode

### Android Setup
1. Install Android Studio
2. Set up Android SDK and emulator
3. Run: `npm run cap:open:android`
4. Build and run in Android Studio

## 🌐 Web Development

1. Run: `npm run dev`
2. Open: `http://localhost:5173`
3. Test authentication flow
4. Check mobile info panel

## 🔧 Common Commands

```bash
# Development
npm run dev                    # Start web dev server
npm run build                  # Build for web
npm run build:mobile          # Build for mobile
npm run cap:sync              # Sync mobile build
npm run cap:run:ios           # Run on iOS
npm run cap:run:android       # Run on Android

# Database
npm run db:generate           # Generate migrations
npm run db:migrate            # Run migrations
npm run db:studio             # Open database studio

# Mobile specific
npm run cap:open:ios          # Open iOS project
npm run cap:open:android      # Open Android project
```

## 🐛 Troubleshooting

### Mobile Issues
- **Build fails**: Run `npm run cap:sync` first
- **iOS simulator**: Make sure Xcode is installed
- **Android emulator**: Check Android Studio setup
- **Safe area not working**: Verify plugin installation

### Web Issues
- **CORS errors**: Check server CORS configuration
- **Environment variables**: Verify .env file
- **Database errors**: Run migrations

### General Issues
- **Node modules**: Delete `node_modules` and run `npm install`
- **Capacitor issues**: Run `npx cap doctor` for diagnostics
- **Build issues**: Clear build cache and rebuild

## 📚 Next Steps

1. **Customize UI**: Edit components in `client/src/components/`
2. **Add Features**: Create new pages and components
3. **Configure Backend**: Modify server routes and database schema
4. **Deploy**: Follow deployment guides for web and mobile
5. **Test**: Add unit and integration tests

## 🆘 Need Help?

- Check the [main README](./README.md) for detailed documentation
- Review [architecture diagrams](./docs/architecture.md)
- Look at the code examples in the components
- Check Capacitor and React documentation
