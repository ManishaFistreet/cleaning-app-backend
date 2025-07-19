const app = require('./app');
require('dotenv').config();
const PORT = process.env.PORT || 4004;
const mongoose = require('mongoose');

const {
    MONGO_URI,
} = process.env;

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));