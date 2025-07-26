# Deployment Guide

## Quick Start

### Step 1: Push to GitHub

```bash
# If you haven't set the remote yet:
git remote add origin https://github.com/MishoMish/adif-log-manager-pro.git

# Push your code
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository: https://github.com/MishoMish/adif-log-manager-pro
2. Click **Settings** (top menu bar)
3. Scroll down and click **Pages** (left sidebar)
4. Under **Source**, select **"GitHub Actions"**
5. Click **Save**

### Step 3: Trigger Deployment

- The workflow will automatically run when you push to main
- If it fails the first time, go to **Actions** tab and click **"Re-run all jobs"**

### Step 4: Access Your Site

Your site will be live at: **https://MishoMish.github.io/adif-log-manager-pro**

## Troubleshooting

### "Pages not enabled" Error

- Make sure you've selected "GitHub Actions" as the source in Pages settings
- Wait a few minutes after enabling Pages before re-running the workflow

### Permission Denied Errors

- The workflow now includes automatic enablement
- Re-run the workflow after enabling Pages in settings

### 404 Not Found

- Check that the index.html file is in the root directory
- Ensure the workflow completed successfully in the Actions tab

## Manual Deployment (Alternative)

If GitHub Actions don't work, you can deploy manually:

1. Go to Settings > Pages
2. Select "Deploy from a branch"
3. Choose "main" branch
4. Select "/ (root)" folder
5. Click Save

Your site will still be available at the same URL.
