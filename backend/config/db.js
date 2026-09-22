const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('[Database] MONGODB_URI is not defined in .env');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = true;

    console.log(
      `[Database] MongoDB Atlas Connected successfully: ${conn.connection.host}`
    );
  } catch (error) {
    isConnected = false;

    console.error('[Database] MongoDB connection failed.');
    console.error(error.message);

    process.exit(1);
  }
};

const getDBStatus = () => ({
  connected: isConnected,
  database: isConnected ? 'MongoDB Atlas' : 'Disconnected',
});

module.exports = {
  connectDB,
  getDBStatus,
  get isConnected() {
    return isConnected;
  },
};