# UniSync Marketplace Deployment Guide

## Local Development Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- Git

### Steps
1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**
   - Copy `.env` file and configure:
     - `MONGODB_URI`: Your MongoDB connection string
     - `PORT`: Server port (default: 5000)

3. **Start the server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

4. **Access the marketplace**
   - Open `marketplace.html` in your browser
   - Or serve the frontend files using a web server

## Vercel Deployment

### Step 1: Prepare Repository
- Ensure all code is pushed to GitHub
- Verify `vercel.json` configuration is correct
- Check that `api/index.js` exists in the root directory

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Select your GitHub repository
5. Configure settings:

### Step 3: Environment Variables
In Vercel dashboard, add these environment variables:
```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/unisync
NODE_ENV=production
```

### Step 4: Deploy
- Click "Deploy"
- Vercel will build and deploy automatically
- Your app will be available at `https://your-project-name.vercel.app`

## Production MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Create database user
5. Add your IP to whitelist (0.0.0.0/0 for Vercel)
6. Get connection string

### Option 2: Other MongoDB Providers
- Any MongoDB hosting service works
- Ensure it allows connections from Vercel's IP ranges

## Testing the Deployment

### After Deployment
1. Visit your Vercel URL
2. Navigate to `/marketplace.html`
3. Test posting an item:
   - Fill out the form with sample data
   - Upload an image (optional)
   - Submit and verify it appears in listings
4. Test messaging:
   - Click "Message" on an item
   - Send a test message
   - Verify success notification

### API Testing
You can test the backend API directly:

```bash
# Get all items
curl https://your-app.vercel.app/api/marketplace/items

# Get specific item
curl https://your-app.vercel.app/api/marketplace/items/{item_id}

# Test CORS preflight
curl -X OPTIONS https://your-app.vercel.app/api/marketplace/items
```

## Troubleshooting

### Common Issues
1. **Vercel Configuration Error ("functions property can't be used with builds")**
   - Fixed by using the simplified `vercel.json` configuration
   - Uses standard Vercel `api/` directory structure
   - Only uses `functions` property without `builds`

2. **MongoDB Connection Error**
   - Verify MONGODB_URI is correctly set
   - Check network access (IP whitelist)
   - Ensure database user has correct permissions

3. **File Upload Issues**
   - Vercel has limitations on file uploads
   - Consider using cloud storage for production

4. **CORS Issues**
   - Verify CORS configuration allows your frontend
   - Check that preflight requests are handled

5. **Build Errors**
   - Check all required files are present
   - Verify package.json dependencies
   - Review Vercel build logs

### Environment Variables Checklist
- [ ] `MONGODB_URI` - Required for database connection
- [ ] `NODE_ENV` - Set to 'production'
- [ ] `VERCEL` - Automatically set by Vercel

## Post-Deployment

### Monitoring
- Check Vercel Analytics for performance
- Monitor MongoDB Atlas for database usage
- Set up error tracking if needed

### Scaling
- Free tier handles basic campus traffic
- Upgrade as needed for higher usage
- Consider CDN for image optimization

## Security Notes
- No sensitive data is stored (anonymous posting)
- Contact information shared only when users message
- File uploads limited to images with size limits
- Input validation on all endpoints

## Support
For issues with:
- **Vercel Deployment**: Check Vercel documentation
- **MongoDB**: Check MongoDB Atlas documentation
- **Application Code**: Review the implementation files

The marketplace backend is now fully functional and ready for deployment!