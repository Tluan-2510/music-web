const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listAll() {
  const apiKey = "AIzaSyCEa6i_VXf0k_WxW9C8ZGrTQbHvKxPZ8z0";
  // The SDK might not have a direct listModels, but we can use fetch
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.models) {
    console.log("Available Models:");
    data.models.forEach(m => {
      console.log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`);
    });
  } else {
    console.log("No models found or error:", data);
  }
}

listAll();
