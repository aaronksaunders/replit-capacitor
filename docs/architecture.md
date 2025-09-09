# Application Architecture Diagrams

## System Overview

```mermaid
graph TB
    subgraph "Client Layer"
        WA[Web App<br/>React + Vite]
        MA[Mobile App<br/>Capacitor + Native]
    end
    
    subgraph "Storage Layer"
        LS[localStorage<br/>Web Only]
        KS[Keychain/Keystore<br/>Mobile Only]
    end
    
    subgraph "Backend Layer"
        API[Express API Server]
        DB[(SQLite Database)]
        AUTH[JWT Authentication]
    end
    
    WA --> LS
    MA --> KS
    WA --> API
    MA --> API
    API --> DB
    API --> AUTH
```

## Authentication Flow

### Web Authentication Flow
```mermaid
sequenceDiagram
    participant U as User
    participant W as Web App
    participant S as Server
    participant L as localStorage

    U->>W: Enter email/password
    W->>S: POST /api/login
    S->>S: Validate credentials
    S->>S: Generate JWT token
    S->>W: Return JWT + user data
    W->>L: Store JWT token
    W->>U: Show authenticated UI
    U->>W: Click "Fetch Protected Data"
    W->>L: Retrieve JWT token
    W->>S: GET /api/profile (with JWT)
    S->>S: Validate JWT
    S->>W: Return protected data
    W->>U: Display protected data
```

### Mobile Authentication Flow
```mermaid
sequenceDiagram
    participant U as User
    participant M as Mobile App
    participant S as Server
    participant K as Secure Storage

    U->>M: Enter email/password
    M->>S: POST https://server.com/api/login
    S->>S: Validate credentials
    S->>S: Generate JWT token
    S->>M: Return JWT + user data
    M->>K: Store JWT in Keychain/Keystore
    M->>U: Show authenticated UI
    U->>M: Click "Fetch Protected Data"
    M->>K: Retrieve JWT from secure storage
    M->>S: GET https://server.com/api/profile (with JWT)
    S->>S: Validate JWT
    S->>M: Return protected data
    M->>U: Display protected data
```

## Data Flow Architecture

```mermaid
graph LR
    subgraph "Web Client"
        WUI[React UI Components]
        WST[localStorage]
        WAPI[API Client]
    end
    
    subgraph "Mobile Client"
        MUI[React UI Components]
        MST[Secure Storage]
        MAPI[API Client]
        MSAFE[Safe Area Handler]
    end
    
    subgraph "Backend Services"
        AUTH[Auth Service]
        USER[User Service]
        JWT[JWT Service]
        DB[(Database)]
    end
    
    WUI --> WST
    WUI --> WAPI
    MUI --> MST
    MUI --> MAPI
    MUI --> MSAFE
    
    WAPI --> AUTH
    MAPI --> AUTH
    AUTH --> JWT
    AUTH --> USER
    USER --> DB
```

## Component Architecture

```mermaid
graph TD
    subgraph "App Component"
        APP[App.tsx]
        SAFE[SafeAreaProvider]
        QUERY[QueryClientProvider]
        TOOLTIP[TooltipProvider]
    end
    
    subgraph "Page Components"
        AUTH[AuthPage]
        ROUTER[Router]
    end
    
    subgraph "UI Components"
        AUTHFORM[AuthForm]
        STATUS[StatusDisplay]
        MOBILE[MobileInfo]
        CARDS[Card Components]
        BUTTONS[Button Components]
    end
    
    subgraph "Services"
        AUTH_SVC[Auth Service]
        STORAGE[Secure Storage]
        CONFIG[API Config]
    end
    
    APP --> SAFE
    APP --> QUERY
    APP --> TOOLTIP
    APP --> ROUTER
    ROUTER --> AUTH
    AUTH --> AUTHFORM
    AUTH --> STATUS
    AUTH --> MOBILE
    AUTH --> CARDS
    AUTHFORM --> AUTH_SVC
    AUTH_SVC --> STORAGE
    AUTH_SVC --> CONFIG
```

## Mobile-Specific Features

```mermaid
graph TB
    subgraph "Capacitor Plugins"
        CORE[Capacitor Core]
        SAFE[Safe Area Plugin]
        SECURE[Secure Storage Plugin]
        APP[App Plugin]
        KEYBOARD[Keyboard Plugin]
        SPLASH[Splash Screen Plugin]
        STATUS[Status Bar Plugin]
    end
    
    subgraph "Platform Detection"
        IOS[iOS Platform]
        ANDROID[Android Platform]
        WEB[Web Platform]
    end
    
    subgraph "Storage Solutions"
        KEYCHAIN[iOS Keychain]
        KEYSTORE[Android Keystore]
        LOCAL[localStorage]
    end
    
    CORE --> IOS
    CORE --> ANDROID
    CORE --> WEB
    
    SAFE --> IOS
    SAFE --> ANDROID
    
    SECURE --> KEYCHAIN
    SECURE --> KEYSTORE
    SECURE --> LOCAL
    
    IOS --> KEYCHAIN
    ANDROID --> KEYSTORE
    WEB --> LOCAL
```

## Build Process

```mermaid
graph LR
    subgraph "Development"
        DEV[Development Server]
        HOT[Hot Reload]
        DEVTOOLS[Dev Tools]
    end
    
    subgraph "Web Build"
        VITE[Vite Build]
        WEB_DIST[dist/]
        WEB_PREVIEW[Preview Server]
    end
    
    subgraph "Mobile Build"
        MOBILE_BUILD[Mobile Build]
        MOBILE_DIST[dist-mobile/]
        CAP_SYNC[Capacitor Sync]
        IOS_PROJ[iOS Project]
        ANDROID_PROJ[Android Project]
    end
    
    DEV --> VITE
    DEV --> MOBILE_BUILD
    VITE --> WEB_DIST
    WEB_DIST --> WEB_PREVIEW
    MOBILE_BUILD --> MOBILE_DIST
    MOBILE_DIST --> CAP_SYNC
    CAP_SYNC --> IOS_PROJ
    CAP_SYNC --> ANDROID_PROJ
```

## Security Architecture

```mermaid
graph TB
    subgraph "Client Security"
        HTTPS[HTTPS Only]
        TOKEN_VALID[Token Validation]
        SECURE_STORE[Secure Storage]
    end
    
    subgraph "Server Security"
        CORS[CORS Configuration]
        JWT_SIGN[JWT Signing]
        BCRYPT[Password Hashing]
        RATE_LIMIT[Rate Limiting]
    end
    
    subgraph "Data Protection"
        ENCRYPT[Data Encryption]
        VALIDATE[Input Validation]
        SANITIZE[Data Sanitization]
    end
    
    HTTPS --> CORS
    TOKEN_VALID --> JWT_SIGN
    SECURE_STORE --> ENCRYPT
    BCRYPT --> VALIDATE
    RATE_LIMIT --> SANITIZE
```

## Environment Configuration

```mermaid
graph LR
    subgraph "Development"
        DEV_ENV[.env.development]
        LOCAL_DB[Local SQLite]
        DEV_SERVER[Dev Server]
    end
    
    subgraph "Production"
        PROD_ENV[.env.production]
        PROD_DB[Production Database]
        PROD_SERVER[Production Server]
    end
    
    subgraph "Mobile"
        MOBILE_ENV[VITE_MOBILE_API_URL]
        MOBILE_API[Absolute API URLs]
        MOBILE_SECURE[Secure Storage]
    end
    
    DEV_ENV --> LOCAL_DB
    PROD_ENV --> PROD_DB
    MOBILE_ENV --> MOBILE_API
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Web Deployment"
        REPLIT[Replit Platform]
        WEB_BUILD[Web Build]
        WEB_DOMAIN[Web Domain]
    end
    
    subgraph "Mobile Deployment"
        APP_STORE[App Store]
        PLAY_STORE[Google Play]
        IOS_BUILD[iOS Build]
        ANDROID_BUILD[Android Build]
    end
    
    subgraph "Backend Deployment"
        SERVER[Server Hosting]
        DATABASE[Database Hosting]
        CDN[CDN/Static Assets]
    end
    
    WEB_BUILD --> REPLIT
    WEB_BUILD --> WEB_DOMAIN
    IOS_BUILD --> APP_STORE
    ANDROID_BUILD --> PLAY_STORE
    SERVER --> DATABASE
    SERVER --> CDN
```
