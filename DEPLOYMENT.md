# 🚀 Deployment Guide for Bennett University Events

## 📋 **Prerequisites**
- GitHub account
- Node.js installed
- Git installed

## 🌐 **Deployment Options**

### **Option 1: Vercel + Railway (Recommended - FREE)**

#### **Frontend (Vercel)**
1. **Build the frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your repository
   - Set build command: `cd client && npm run build`
   - Set output directory: `client/build`
   - Deploy!

#### **Backend (Railway)**
1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Create new project from GitHub repo**
4. **Add environment variables:**
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bennett_events
   JWT_SECRET=your-secret-key-here
   NODE_ENV=production
   ```
5. **Deploy!**

### **Option 2: Netlify + Heroku (FREE)**

#### **Frontend (Netlify)**
1. **Build the frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `client/build` folder
   - Or connect your GitHub repo

#### **Backend (Heroku)**
1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```
3. **Add environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set NODE_ENV=production
   ```
4. **Deploy:**
   ```bash
   git push heroku main
   ```

### **Option 3: Render (FREE - Full Stack)**

1. **Go to [render.com](https://render.com)**
2. **Sign up with GitHub**
3. **Create two services:**
   - **Web Service** (Backend)
   - **Static Site** (Frontend)

#### **Backend Service:**
- Build Command: `cd server && npm install`
- Start Command: `cd server && npm start`
- Environment Variables:
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bennett_events
  JWT_SECRET=your-secret-key-here
  NODE_ENV=production
  ```

#### **Frontend Service:**
- Build Command: `cd client && npm install && npm run build`
- Publish Directory: `client/build`

## 🗄️ **Database Setup (MongoDB Atlas)**

1. **Go to [mongodb.com/atlas](https://mongodb.com/atlas)**
2. **Create free account**
3. **Create new cluster**
4. **Get connection string**
5. **Replace in environment variables**

## 🔧 **Required Changes for Production**

### **1. Update API URLs**
Update `client/package.json`:
```json
{
  "proxy": "https://your-backend-url.herokuapp.com"
}
```

### **2. Environment Variables**
Create production environment files:
- `server/.env.production`
- `client/.env.production`

### **3. CORS Configuration**
Update `server/index.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

## 📱 **Quick Deploy Commands**

### **For Vercel + Railway:**
```bash
# 1. Build frontend
cd client && npm run build

# 2. Commit changes
git add .
git commit -m "Ready for deployment"
git push origin main

# 3. Deploy to Vercel (via web interface)
# 4. Deploy to Railway (via web interface)
```

### **For Render (All-in-one):**
```bash
# 1. Commit changes
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Deploy via Render web interface
```

## 🔗 **After Deployment**

1. **Update frontend API URLs**
2. **Test all functionality**
3. **Share your live URL!**

## 📞 **Support**

If you need help with deployment, check:
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

## 🎯 **Live Demo URLs**

Once deployed, your app will be available at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`

**Happy Deploying! 🚀**
