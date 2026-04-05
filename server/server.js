

// imrequire("dotenv").config();
// const app = require("./app");
// const connectDB = require("./config/db");

// const PORT = process.env.PORT || 7000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }).catch(err => {
//   console.error("Failed to connect DB", err);
// // });
// import dotenv from "dotenv";
// import app from "./app.js";
// import connectDB from "./config/db.js";

// dotenv.config();

// const PORT = process.env.PORT || 7000;

// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Failed to connect DB", err);
//   });


import dotenv from "dotenv";
dotenv.config();   // ✅ MUST be FIRST

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 7000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect DB", err);
  });