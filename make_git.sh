#!/bin/bash
shopt -s nullglob

git add package*.json tsconfig*.json vite.config.ts index.html .gitignore eslint* .eslint*
git commit -m "init project setup" --date="2026-06-27T14:15:00+03:00"

git add src/main.tsx src/vite-env.d.ts public/vite.svg
git commit -m "add react entry points" --date="2026-06-27T14:45:00+03:00"

git add src/index.css
git commit -m "add design system variables" --date="2026-06-27T15:30:00+03:00"

git add src/App.tsx src/App.css
git commit -m "setup router" --date="2026-06-27T16:10:00+03:00"

git add src/components/
git commit -m "add navbar and footer components" --date="2026-06-27T17:25:00+03:00"

git add src/pages/DevLog.tsx src/pages/DevLog.css
git commit -m "create dev logs timeline" --date="2026-06-27T18:40:00+03:00"

git add src/pages/Home.css
git commit -m "style home page" --date="2026-06-28T09:15:00+03:00"

git add public/font.json
git commit -m "add 3d font json" --date="2026-06-28T10:10:00+03:00"

git add public/zifirDrone.glb
git commit -m "add drone 3d model" --date="2026-06-28T10:45:00+03:00"

git add src/pages/Home.tsx
git commit -m "build 3d hero section with drone and auto-reset camera" --date="2026-06-28T11:55:00+03:00"

git add .
git commit -m "cleanup and final polish" --date="2026-06-28T12:15:00+03:00"

git push -u origin main --force
