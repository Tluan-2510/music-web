const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testKey() {
  const apiKey = "AIzaSyCEa6i_VXf0k_WxW9C8ZGrTQbHvKxPZ8z0";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // Using one of the available models from the list
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Hello! If you can read this, say 'Gemini 2.0 is alive!'");
    const response = await result.response;
    console.log("Success! Response:", response.text());
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testKey();
