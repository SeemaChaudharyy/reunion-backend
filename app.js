const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://seemachaudharyy01:1234@cluster0.ilbda.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

// API Route
app.get("/", (req, res) => {
    res.send("Hello from backend side");
});

// Start Server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
