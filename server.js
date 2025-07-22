const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 5000;

// Optional: Print Mongo URI (remove sensitive info before logging in production)
console.log("Connecting to MongoDB:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

// Extra: Listen for errors after initial connection attempt
mongoose.connection.on('error', (err) => {
  console.error('❌ Post-connect MongoDB error:', err.message);
});
