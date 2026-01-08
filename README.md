# Product Search Application

A full-stack web application for searching products from a PostgreSQL database. Built with Express.js backend and vanilla JavaScript frontend.

## Features

- Search products by name or description
- Filter by category (Electronics, Furniture, Appliances, Sports)
- Responsive design
- Real-time search results
- PostgreSQL database integration

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Railway

## Deploying to Railway

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Create Railway Project

1. Go to [Railway](https://railway.app/)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will auto-detect the Node.js app

### 3. Add PostgreSQL Database

1. In your Railway project, click "New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically provision a PostgreSQL database
4. The `DATABASE_URL` environment variable will be automatically set

### 4. Initialize Database

After deployment, you need to run the database schema:

1. Go to your PostgreSQL service in Railway
2. Click on "Data" tab
3. Click "Query"
4. Copy and paste the contents of `database.sql` and execute it

Alternatively, you can use Railway CLI:

```bash
railway login
railway link
railway run psql $DATABASE_URL < database.sql
```

### 5. Access Your App

Railway will provide you with a public URL. Your app will be live at:
```
https://your-app-name.up.railway.app
```

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL installed locally

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create a local PostgreSQL database:
```bash
createdb product_search
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your local database credentials:
```
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/product_search
PORT=3000
```

5. Initialize database:
```bash
psql product_search < database.sql
```

6. Start the server:
```bash
npm start
```

7. Open browser to `http://localhost:3000`

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/categories` - Get all unique categories
- `GET /api/search?query=<search>&category=<category>` - Search products

## Project Structure

```
product-search/
├── public/
│   └── index.html          # Frontend interface
├── server.js               # Express server and API
├── database.sql            # Database schema and seed data
├── package.json            # Dependencies
├── .env.example           # Environment variables template
└── README.md              # This file
```

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (automatically set by Railway)
- `PORT` - Server port (automatically set by Railway, defaults to 3000)

## Sample Data

The database includes 20 sample products across 4 categories:
- Electronics (laptops, monitors, keyboards, etc.)
- Furniture (chairs, desks, shelves, etc.)
- Appliances (coffee makers, blenders, microwaves, etc.)
- Sports (running shoes, yoga mats, basketballs, etc.)
