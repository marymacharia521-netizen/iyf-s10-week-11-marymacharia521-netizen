const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Missing MONGODB_URI in environment variables");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    const hints = [];

    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      hints.push("Check that your internet connection and DNS are working.");
      hints.push("Confirm your MongoDB Atlas cluster is running and not paused.");
      hints.push("Verify that your current IP address is allowed in Atlas Network Access.");
      hints.push("Double-check that the cluster hostname in MONGODB_URI is correct.");
    }

    if (error.name === "MongoServerSelectionError") {
      hints.push("MongoDB could not reach any server in the cluster within 10 seconds.");
    }

    console.error("MongoDB connection failed.");
    console.error(`Reason: ${error.message}`);

    if (hints.length > 0) {
      console.error("Possible fixes:");
      hints.forEach((hint) => console.error(`- ${hint}`));
    }

    throw error;
  }
};

module.exports = connectDB;
