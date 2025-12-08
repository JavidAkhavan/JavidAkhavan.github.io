# GitHub Pages Setup Instructions

## ⚠️ Current Issue

GitHub Pages is trying to use the **legacy Jekyll build** instead of your custom **Next.js GitHub Actions workflow**.

## 🔧 Solution: Change Deployment Source

### Step 1: Navigate to Repository Settings

Go to: https://github.com/JavidAkhavan/JavidAkhavan.github.io/settings/pages

### Step 2: Change Build Source

1. Look for the **"Build and deployment"** section
2. Under **"Source"**, you'll see a dropdown
3. Change from **"Deploy from a branch"** to **"GitHub Actions"**
4. Click **Save**

### Step 3: Verify Workflow

After changing to GitHub Actions:

1. Go to: https://github.com/JavidAkhavan/JavidAkhavan.github.io/actions
2. You should see your "Deploy to GitHub Pages" workflow running
3. Wait 2-3 minutes for it to complete

### Step 4: Check Your Site

Visit: https://javidakhavan.github.io

You should now see your Next.js portfolio with:

- ✅ Profile image
- ✅ 9 sections (Hero, About, Experience, Education, Skills, Projects, Publications, Teaching, Contact)
- ✅ Sticky sidebar navigation (desktop only)
- ✅ Publications and Teaching sections
- ✅ Dark/Light theme toggle

---

## 📋 What This Change Does

### Before (Legacy Mode):

- GitHub tries to build with Jekyll
- Fails because this is a Next.js app
- Error: "No such file or directory @ rb_check_realpath_internal - /github/workspace/venv/bin/python"

### After (GitHub Actions Mode):

- Uses your `.github/workflows/deploy.yml` workflow
- Runs `npm install` and `npm run build`
- Deploys the `out/` directory (Next.js static export)
- Works perfectly with Next.js

---

## 🔍 How to Verify It's Fixed

### Check 1: Workflow Status

Visit: https://github.com/JavidAkhavan/JavidAkhavan.github.io/actions

You should see:

- ✅ Green checkmark (workflow succeeded)
- No Jekyll errors
- Build completes in 2-3 minutes

### Check 2: Live Site

Visit: https://javidakhavan.github.io

You should see:

- Your professional portfolio
- Sidebar navigation on left (desktop)
- All 9 sections rendering correctly
- Profile image in About section

---

## 🐛 Troubleshooting

### If you still see Jekyll errors:

1. Double-check you selected **"GitHub Actions"** not **"Deploy from a branch"**
2. Make sure you saved the settings
3. Try triggering a new deployment by pushing a small change

### If the workflow fails:

1. Check the workflow logs in the Actions tab
2. Look for the specific error message
3. Common issues:
   - Node version mismatch (should be 20)
   - Missing dependencies (should run `npm ci`)
   - Build errors (should run `npm run build`)

### If the site doesn't load:

1. Check that the workflow completed successfully
2. Verify the `out/` directory was uploaded
3. Make sure `.nojekyll` file exists in `public/` folder ✅ (already present)

---

## ✅ Expected Workflow Output

When GitHub Actions runs successfully, you should see:

```
Build
├─ Checkout ✅
├─ Setup Node.js ✅
├─ Install dependencies (npm ci) ✅
├─ Build (npm run build) ✅
└─ Upload artifact (./out) ✅

Deploy
└─ Deploy to GitHub Pages ✅
```

Total time: ~2-3 minutes

---

## 📞 Need Help?

If you're still having issues after changing to GitHub Actions:

1. Check the Actions tab for detailed error logs
2. Verify the workflow file exists: `.github/workflows/deploy.yml`
3. Ensure the `out/` directory is created during build
4. Confirm `.nojekyll` exists in `public/` folder

Current status of all prerequisites:

- ✅ Workflow file configured correctly
- ✅ `.nojekyll` file present
- ✅ `next.config.ts` set to `output: 'export'`
- ✅ All code committed and pushed to main
- ❌ GitHub Pages source needs to be changed to "GitHub Actions"

---

## 🎯 Quick Reference

**Repository Settings URL:**
https://github.com/JavidAkhavan/JavidAkhavan.github.io/settings/pages

**Actions Dashboard:**
https://github.com/JavidAkhavan/JavidAkhavan.github.io/actions

**Live Site:**
https://javidakhavan.github.io

**Change Required:**
Source: ~~"Deploy from a branch"~~ → **"GitHub Actions"** ✅
