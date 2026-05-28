<div align="center">

# Profile Activity Miner

The ultimate antidote to standard, boring green contribution tiles. This automated generator hooks into a full 53x7 grid layout, rendering a real-time pixel art mining simulator directly onto your profile. 

Watch a custom vector miner advance column by column, physically smashing your active days apart. Every broken block triggers a shatter animation and respawns cleanly after 5 seconds.

---

## Live Preview

<img src="mining-grid.svg" alt="Mining Project Grid" width="100%" max-width="720" style="border-radius: 8px;" />

---

## Installation

Runs completely hands-free using GitHub Actions.

### 1. Add Workflow Engine
Drop a file into `.github/workflows/mine.yml` within your profile repository:

```yaml
name: Run Pixel Miner

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
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: node index.js
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "Miner extracted more resources"
          file_pattern: "mining-grid.svg"
