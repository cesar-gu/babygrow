# BabyGrow Deployment Configuration for GitHub Pages

## Configuration Details

- **Repository**: cesar-gu/babygrow
- **Deploy Type**: Static Site Generation (Astro)
- **Target**: GitHub Pages (https://cesar-gu.github.io/babygrow/)
- **Base Path**: /babygrow
- **Build Output**: dist/

## Automatic Deployment

The project uses GitHub Actions for continuous deployment. When you push to the `main` branch:

1. Checkout code
2. Install Node.js 22.14.0
3. Install dependencies
4. Convert datasets from Excel to JSON
5. Build Astro to static HTML
6. Deploy to GitHub Pages

## Manual Deployment

```bash
nvm use
npm install
npm run convert-datasets
npm run build
npm run preview  # To test locally before pushing
```

## Repository Setup

Make sure your GitHub repository is configured correctly:

1. **Settings → Pages**:
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

2. **Settings → Actions**:
   - Allow all actions
   - Read and write permissions for workflows

3. **Secrets** (if needed):
   - None required (public repository)

## DNS Configuration (Optional)

If using a custom domain, add DNS records pointing to GitHub Pages servers.

## Troubleshooting

- **Build fails**: Check Node.js version matches .nvmrc
- **Dataset errors**: Run `npm run convert-datasets` locally
- **Deploy not updating**: Check GitHub Pages settings and clear browser cache
- **SSL errors**: GitHub Pages automatically provides HTTPS

## Files

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `astro.config.mjs` - Astro configuration with GitHub Pages settings
- `.nvmrc` - Node.js version specification
