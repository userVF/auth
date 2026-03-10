Full-stack cookie-based, passwordless authentication. Includes IP rate limiting, per-identifier cooldown and attempt limiting. 
Preserves the user’s intended private route after login.
The template is SSR suitable for small/middle multilang project with using a few of dependencies.

<img width="1058" height="595" alt="auth" src="https://github.com/user-attachments/assets/7b566596-4825-46f3-a31b-446232384d10" />


## Prerequisites
- Node.js >= 22 (required for built-in SQLite and type stripping)

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
node --watch ./server/platform/app-server.js
```
Run development server (in new terminal tab)
```bash
npm run dev
```
