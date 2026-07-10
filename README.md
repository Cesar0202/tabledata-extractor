# TableData Extractor

A monorepo project containing a developer-first Chrome Extension for scraping HTML tables and a Next.js Landing Page for distribution.

## Project Structure

This is a monorepo containing two main packages:
- `/extension`: The Chrome extension built with React, TypeScript, Tailwind CSS, and Vite.
- `/landing`: The presentation and distribution Landing Page built with Next.js and Tailwind CSS.

## Getting Started

### 1. Chrome Extension

The extension allows you to extract tables from any website, clean the formatting, and export the data to CSV, JSON, or directly to a Webhook (like n8n or Make).

#### Prerequisites
- Node.js installed

#### Development & Build
1. Navigate to the extension folder:
   ```bash
   cd extension
   ```
2. Install dependencies (if you haven't installed them from the root):
   ```bash
   npm install
   ```
3. Build the extension for production:
   ```bash
   npm run build
   ```
   This will generate a `dist` folder.

#### Installation in Chrome
1. Go to `chrome://extensions/`
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked**.
4. Select the `extension/dist` folder.

#### Testing
To run the automated tests for the table parsing logic:
```bash
cd extension
npm run test
```

---

### 2. Landing Page

The Next.js landing page serves as the hub for sharing this tool with your colleagues.

#### Development
1. Navigate to the landing page folder:
   ```bash
   cd landing
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Deployment (Vercel)
The landing page is optimized for Vercel deployment.
1. Push this repository to GitHub.
2. Go to your Vercel dashboard and click **Add New... > Project**.
3. Import your GitHub repository.
4. Set the **Framework Preset** to `Next.js`.
5. Set the **Root Directory** to `landing`.
6. Click **Deploy**.

## Tech Stack
- **Extension**: Vite, React, TypeScript, Tailwind CSS, CRXJS (Manifest V3), Vitest.
- **Landing Page**: Next.js (App Router), React, TypeScript, Tailwind CSS.
