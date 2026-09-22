const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDB, getDBStatus } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();


const app = express();

// Security and utility middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, or same-origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    return callback(null, true); // Dev friendly
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health & System Status Endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDBStatus();
  res.status(200).json({
    status: 'online',
    restaurant: process.env.RESTAURANT_NAME || 'RAM & SHYAM QUALITY BIRIYANI',
    whatsapp: process.env.WHATSAPP_NUMBER || '917032118129',
    timestamp: new Date().toISOString(),
    database: dbStatus
  });
});

// Mount Application Routes
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/catering', require('./routes/cateringRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/uploads', require('./routes/uploadRoutes'));
app.use('/api/daily-specials', require('./routes/dailySpecialsRoutes'));

// 404 Catch-all for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} does not exist.`
  });
});

// Root welcome
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Ram & Shyam Quality Biriyani REST API Server',
    endpoints: {
      health: '/api/health',
      menu: '/api/menu',
      contact: '/api/contact',
      orders: '/api/orders'
    }
  });
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;



// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
});
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🍗 RAM & SHYAM QUALITY BIRIYANI - SERVER ACTIVE`);
      console.log(`🚀 Port: http://localhost:${PORT}`);
      console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`📖 Menu API: http://localhost:${PORT}/api/menu`);
      console.log(`💬 Contact API: http://localhost:${PORT}/api/contact`);
      console.log(`=======================================================`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();