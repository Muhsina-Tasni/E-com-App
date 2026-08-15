import "dotenv/config"; 
//  changes in here 
// import dotenv from "dotenv"
import app from "./app.js";
import connectDB from "./config/db.js";

// dotenv.config();

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

