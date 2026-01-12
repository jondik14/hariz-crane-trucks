# Hariz Transport Website

A modern Next.js website for Hariz Crane Trucks, a Sydney-based crane truck hire and heavy transport service.

## Tech Stack

- **Framework**: Next.js 15.5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber / Three.js
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
# Create production build
npm run build

# Start production server locally
npm start
```

## Environment Variables

Create a `.env.local` file in the root directory (optional):

```env
# Google Analytics (optional - site works without it)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Deploying to Vercel

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Hariz Transport website"

# Add your GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/hariz-transport.git

# Push to GitHub
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Select your `hariz-transport` repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `.` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
5. Add environment variables (optional):
   - `NEXT_PUBLIC_GA_ID` = Your Google Analytics Measurement ID
6. Click **"Deploy"**

### Step 3: Configure Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to **Domains**
3. Add your custom domain: `harizcranetrucks.com.au`
4. Follow DNS configuration instructions

## Project Structure

```
├── public/
│   ├── assets/           # Images, fonts, 3D models
│   ├── robots.txt        # SEO robots file
│   └── sitemap.xml       # SEO sitemap
├── src/
│   ├── app/
│   │   ├── about/        # About page
│   │   ├── services/     # Services page
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Homepage
│   └── components/
│       └── GoogleAnalytics.tsx
├── next.config.ts
├── package.json
└── tailwind.config.ts
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

Private - All rights reserved.
