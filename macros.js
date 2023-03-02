require('dotenv').config();
const { Configuration,OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  getMacros: async function getMacros({ item, quantity, unit }) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Convert requests to generate total calories and dietary macros in JSON format. The input and output must be valid JSON.

Example Input: {"item":"Chicken breast","quantity":0.5,"unit":"lbs"}
Output: {"calories":380,"protein":46,"carbs":0,"fat":20}

Input: {"item":"${item}","quantity":${quantity},"unit":${unit ?? 'units'}}
Output: `,
      temperature:0,
      max_tokens:1000,
      top_p:1.0,
      frequency_penalty:0.0,
      presence_penalty:0.0,
    });

    console.log(response.data.choices[0].text);

    return JSON.parse(response.data.choices[0]?.text);
  }
};