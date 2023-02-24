require('dotenv').config();
const { Configuration,OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  generateImage: async function generateImage(noun) {
    const response = await openai.createImage({
      prompt: `circular icon of a ${noun} in flat design style`,
      n: 1,
      size: "512x512"
    });

    return response.data.data[0].url;
  }
};