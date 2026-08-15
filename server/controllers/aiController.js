import OpenAI from "openai";
import Product from "../models/Product.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const recommendBooks = async (req, res) => {
  try {
    const { preference } = req.body;

    if (!preference) {
      return res.status(400).json({
        message: "Please provide your book preference",
      });
    }

    const books = await Product.find({}).lean();

    const bookData = books.map((book) => ({
      id: book._id,
      name: book.name,
      description: book.description,
      price: book.price,
      category: book.category_id,
    }));

    const prompt = `
You are an AI book recommendation assistant for a bookstore
called PageTurner.

User preference:
${preference}

Available books:
${JSON.stringify(bookData)}

Recommend the 3 most suitable books from the available books.

For each recommendation provide:
- book id
- book name
- short reason why it matches the user's preference

Only recommend books from the provided list.
`;

    const response = await openai.responses.create({
      model: "gpt-5",
      input: prompt,
    });

    res.status(200).json({
      recommendations: response.output_text,
    });

  } catch (error) {
    console.error("AI recommendation error:", error);

    res.status(500).json({
      message: "Failed to generate recommendations",
    });
  }
};