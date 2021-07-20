const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const con = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected : ${con.connection.host}`);
  } catch (error) {
    console.log("Failed To Connect DB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
