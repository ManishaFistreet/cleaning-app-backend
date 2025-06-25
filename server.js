const app = require('./app');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

const {
    MONGO_URI,
    MONGO_USER,
    MONGO_PASS,
} = process.env;

mongoose
    .connect(MONGO_URI, {
        user: MONGO_USER,
        pass: MONGO_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));