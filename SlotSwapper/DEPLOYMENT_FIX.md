# 🔧 CORS Issue Fix - Deployment Guide

## Problem
Your SlotSwapper app is deployed but experiencing CORS errors because:
- Backend on Render doesn't allow requests from your Netlify frontend
- Frontend on Netlify is pointing to localhost instead of Render backend

## ✅ Solution Applied

### Files Updated:
1. **Backend `.env`** - Updated for local development
2. **Backend `.env.production`** - Updated for Render deployment  
3. **Frontend `.env`** - Updated for local development
4. **Frontend `.env.production`** - Created for Netlify deployment

---

## 🚀 Step-by-Step Fix

### 1️⃣ Configure Backend on Render

Go to your Render dashboard for `slotswapper-pchn`:

**Set these Environment Variables:**
```bash
FRONTEND_URL=https://slotswapper-abhishek.netlify.app
MONGODB_URI=mongodb+srv://abhishekanandvii_db_user:EukUasZ534qMK48F@cluster0.qanwsfx.mongodb.net/slotswapper?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=slotswapper_production_jwt_secret_key_2025_change_this
NODE_ENV=production
PORT=5000
```

**How to add them:**
1. Go to https://dashboard.render.com/
2. Click on your `slotswapper-pchn` service
3. Go to **Environment** tab
4. Click **Add Environment Variable**
5. Add each variable above
6. Click **Save Changes**
7. Render will **automatically redeploy** with new settings

---

### 2️⃣ Configure Frontend on Netlify

Go to your Netlify dashboard for `slotswapper-abhishek`:

**Set this Environment Variable:**
```bash
VITE_API_URL=https://slotswapper-pchn.onrender.com/api
```

**How to add it:**
1. Go to https://app.netlify.com/
2. Click on your `slotswapper-abhishek` site
3. Go to **Site configuration** → **Environment variables**
4. Click **Add a variable**
5. Key: `VITE_API_URL`
6. Value: `https://slotswapper-pchn.onrender.com/api`
7. Click **Save**
8. Go to **Deploys** tab
9. Click **Trigger deploy** → **Clear cache and deploy site**

---

### 3️⃣ Push Code Changes (Optional but Recommended)

The local `.env` files have been updated, but you should commit the production env examples:

```powershell
# Navigate to your repo
cd "c:\Users\Abhishek\OneDrive\Desktop\VS Code\frontend\intern assignment\React-Intern-Assignment"

# Add the updated files
git add SlotSwapper/backend/.env.production
git add SlotSwapper/frontend/.env.production
git add SlotSwapper/DEPLOYMENT_FIX.md

# Commit
git commit -m "fix: Update production env files for CORS configuration"

# Push
git push origin main
```

---

## 🧪 Testing the Fix

After both services redeploy:

1. **Clear Browser Cache** (Important!)
   - Press `Ctrl + Shift + Delete`
   - Select "Cached images and files"
   - Click "Clear data"

2. **Test the Signup Flow**
   - Go to https://slotswapper-abhishek.netlify.app/signup
   - Try creating an account
   - You should **NOT** see CORS errors anymore

3. **Check Console**
   - Open DevTools (F12)
   - Go to Console tab
   - Should see successful API calls, no red CORS errors

4. **Verify Backend Health**
   - Visit: https://slotswapper-pchn.onrender.com/api/health
   - Should see: `{"status":"ok","mongodb":"connected",...}`

---

## 🔍 Verification Checklist

- [ ] Render environment variables set (especially `FRONTEND_URL`)
- [ ] Netlify environment variable set (`VITE_API_URL`)
- [ ] Both services redeployed
- [ ] Browser cache cleared
- [ ] No CORS errors in console
- [ ] Signup/Login working
- [ ] API calls succeeding

---

## 🐛 If Issues Persist

### Check Backend CORS in Render Logs:
1. Go to Render dashboard → `slotswapper-pchn`
2. Click **Logs**
3. Look for: `Server running on port 5000`
4. Verify no CORS errors when frontend makes requests

### Check Frontend Build in Netlify:
1. Go to Netlify dashboard → `slotswapper-abhishek`
2. Click **Deploys** → Latest deploy
3. Check **Deploy log**
4. Verify `VITE_API_URL` is shown during build

### Manual CORS Test:
```bash
# Test if backend allows your frontend
curl -H "Origin: https://slotswapper-abhishek.netlify.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://slotswapper-pchn.onrender.com/api/auth/signup -v
```

Should see: `Access-Control-Allow-Origin: https://slotswapper-abhishek.netlify.app`

---

## 📝 Important Notes

### For Local Development:
- Backend `.env` now points to Netlify frontend (won't work locally)
- **To run locally**, temporarily change backend `.env`:
  ```bash
  FRONTEND_URL=http://localhost:3000
  ```
- And frontend `.env`:
  ```bash
  VITE_API_URL=http://localhost:5000/api
  ```

### For Production:
- **Never commit** `.env` files with secrets to Git
- Always use platform environment variables (Render/Netlify UI)
- `.env.production` files are examples/templates only

### Security:
- Change `JWT_SECRET` to a strong random string in production
- Don't share your MongoDB URI publicly
- Use different secrets for dev/prod

---

## 🎯 Quick Commands

### Redeploy Backend (Render):
- Go to Render dashboard → Trigger manual deploy
- Or: Push code changes to trigger auto-deploy

### Redeploy Frontend (Netlify):
- Go to Netlify dashboard → Trigger deploy
- Or: Push code changes to trigger auto-deploy

### Check Deployment Status:
- **Backend**: https://slotswapper-pchn.onrender.com/api/health
- **Frontend**: https://slotswapper-abhishek.netlify.app/

---

## ✅ Expected Result

After following these steps:
- ✅ Frontend can make API calls to backend
- ✅ No CORS errors in browser console
- ✅ Signup/Login works
- ✅ WebSocket connections establish
- ✅ Real-time notifications work

---

**Need Help?** Check the browser console for specific error messages and Render logs for backend issues.
