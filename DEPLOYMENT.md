# Deployment Guide

This guide explains how to deploy your portfolio to GitHub Pages.

## Prerequisites

- GitHub repository created at `github.com/javidakhavan/javidakhavan.github.io`
- Code pushed to `main` branch
- GitHub Pages enabled in repository settings

## Automatic Deployment (Recommended)

The project is configured with GitHub Actions for automatic deployment when you push to the `main` branch.

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### Step 2: Push to Main Branch

```bash
# From develop branch, merge to main
git checkout main
git merge develop
git push origin main
```

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Install dependencies
- Build the project
- Deploy to GitHub Pages

### Step 3: View Your Site

After deployment completes (usually 2-3 minutes), your site will be available at:
- **https://javidakhavan.github.io**

## Manual Deployment (Alternative)

If you prefer to deploy manually:

### Step 1: Build the Project

```bash
npm run build
```

This creates a static export in the `out/` directory.

### Step 2: Deploy to GitHub Pages

```bash
# Install gh-pages package
npm install -D gh-pages

# Deploy out directory
npx gh-pages -d out -b gh-pages
```

### Step 3: Configure GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select **gh-pages** branch
4. Click **Save**

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain:
```
yourdomain.com
```

2. Configure DNS settings with your domain provider:
   - Add an A record pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - OR add a CNAME record pointing to `javidakhavan.github.io`

3. Update `next.config.ts` if needed (currently configured for root domain)

4. In GitHub repository settings → Pages → Custom domain, enter your domain

## Environment Variables

The project uses environment variables for configuration. For production:

1. Copy `.env.local.example` to `.env.local`
2. Fill in production values
3. For GitHub Actions, add secrets in **Settings** → **Secrets and variables** → **Actions**

## Troubleshooting

### Build Fails

- Check the GitHub Actions logs for errors
- Ensure all dependencies are listed in `package.json`
- Test build locally: `npm run build`

### Pages Not Updating

- Clear browser cache
- Wait 2-3 minutes for deployment to complete
- Check GitHub Actions workflow status

### Images Not Loading

- Ensure `next.config.ts` has `images.unoptimized: true`
- Check that images are in the `public/` directory
- Use relative paths starting with `/`

### 404 Errors

- Ensure `trailingSlash: true` in `next.config.ts`
- Check that `output: 'export'` is set
- Verify `.nojekyll` file exists in `public/`

## Update Your Site

To update content and redeploy:

1. Edit `src/data/site-content.json` with your content
2. Test locally: `npm run dev`
3. Commit and push:
```bash
git add .
git commit -m "update: content changes"
git push origin develop
```

4. Merge to main:
```bash
git checkout main
git merge develop
git push origin main
```

GitHub Actions will automatically rebuild and redeploy.

## Deployment Checklist

Before deploying to production:

- [ ] Update all placeholder content in `src/data/site-content.json`
- [ ] Add real email and social media links
- [ ] Replace example project links with real ones
- [ ] Add real experience, education, and skills
- [ ] Test all links and navigation
- [ ] Check responsiveness on mobile devices
- [ ] Test both light and dark themes
- [ ] Optimize images and assets
- [ ] Update meta tags and SEO info
- [ ] Test build locally: `npm run build`
- [ ] Review and test the built site: `npm run start`

## Monitoring

After deployment:

- Check GitHub Actions workflow status
- Test all pages and features
- Verify analytics (if configured)
- Check console for errors
- Test on different devices and browsers

## Rollback

If you need to rollback:

```bash
# Revert the last commit
git revert HEAD
git push origin main

# Or rollback to a specific commit
git reset --hard <commit-hash>
git push origin main --force
```

---

For more information, see:
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
