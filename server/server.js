import "dotenv/config"; 

import app from "./app.js";
import connectDB from "./config/db.js";
import dns from "node:dns";


// Use Google DNS for MongoDB Atlas SRV resolution
dns.setServers(["8.8.8.8", "8.8.4.4"]);



const PORT = process.env.PORT || 7000;



///ai
console.log(
  "OpenAI Key:",
  process.env.OPENAI_API_KEY ? "Loaded ✅" : "NOT LOADED ❌"
);


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect DB", err);
  });

