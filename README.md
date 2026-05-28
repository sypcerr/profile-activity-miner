<div align="center">

# ⛏️ Profile Activity Miner

[![Awesome](https://img.shields.io/badge/Awesome-Profile_Addons-purple?style=for-the-badge&logo=github)](https://github.com/stefanzweifel/git-auto-commit-action)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>Stop showcasing stagnant green squares. Transform your GitHub contribution into a living 2D mining simulation.</strong>
</p>

### Live Preview

<img src="mining-grid.svg" alt="Profile Activity Miner Preview" width="100%" max-width="740" style="border-radius: 10px; border: 1px solid #30363d; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />

---

</div>

## 🚀 Quick Setup Guide

### Step 1: Clone the Core Files
Ensure your personal profile repository (the one named exactly after your GitHub username) contains your updated `index.js`, `package.json`, and `LICENSE` files in the root folder.

### Step 2: Establish the Automation
Create a file at `.github/workflows/mine.yml` within your repository and paste this production-ready configuration:

```yaml
name: Run Profile Miner

on:
  schedule:
    - cron: "0 */12 * * *" 
  workflow_dispatch:    

permissions:
  contents: write 

jobs:
  mine:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code Base
        uses: actions/checkout@v3

      - name: Initialize Node Environment
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Extract GitHub Contribution Data & Render SVG
        run: node index.js
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Deploy Asset Back to Repository
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "Miner secured more ores [skip ci]"
          file_pattern: "mining-grid.svg"
```

### Step 3: Mount to Your Profile README
Open your main profile `README.md` file and add the markdown tag below to render your dynamic mining grid:

⚠️ Note: Replace both instances of YOUR_USERNAME with your actual GitHub username.

```markdown
![](https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_USERNAME/main/mining-grid.svg)
```
