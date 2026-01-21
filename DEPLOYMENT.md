# 部署到 Vercel

## 1) 推到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## 2) 在 Vercel 建立專案

1. 進入 https://vercel.com
2. 選擇 **New Project**
3. 選取剛剛推到 GitHub 的 repo
4. Framework 選擇 **Vite**（或自動偵測）
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. 點擊 **Deploy**

## 3) 後續更新

每次 push 到 `main`（或你設定的分支），Vercel 會自動重新部署。
