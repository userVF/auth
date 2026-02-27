Full-stack cookie-based, passwordless authentication. Includes IP rate limiting, per-identifier cooldown and attempt limiting. Preserves the user’s intended private route after login.

<img width="1058" height="595" alt="auth" src="https://github.com/user-attachments/assets/76b42c0a-707a-40c7-9069-3b5762343c13" />


## Prerequisites
- Node.js >= 22 (required for built-in type stripping)

## Code setup
Install dependencies
```bash
npm ci
```
Build bundles
```bash
npm run build
```

## Live example
Run application server
```bash
node ./server/platform/app-server.js
```
Run static server (in new terminal tab)
```bash
node ./server/platform/static-server.js
```
Open in a browser
```bash
http://localhost:3000
```
## Development
Run application server
```bash
node ./server/platform/app-server.js
```
Run development server (in new terminal tab)
```bash
npm run dev
```
