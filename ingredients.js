require('dotenv').config();
const { Configuration,OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  getIngredients: async function getIngredients(recipe, cookingFor) {
  const response = await openai.createCompletion({
    model:"text-davinci-003",
    prompt:`Convert requests to generate an ingredients list in JSON format.
    
${cookingFor ? `Cooking for: ${cookingFor}` : ''}

Example: Grilled chicken with roasted potatoes
Output: [{"item":"Chicken breast","quantity":0.5,"unit":"lbs"},{"item":"Potato","quantity":4}]

Input: ${recipe}
Output: `,
      temperature:0,
      max_tokens:1000,
      top_p:1.0,
      frequency_penalty:0.0,
      presence_penalty:0.0,
    });

    return JSON.parse(response.data.choices[0]?.text);
  }
};