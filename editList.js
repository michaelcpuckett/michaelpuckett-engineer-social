require('dotenv').config();
const { Configuration,OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  editList:  async function editList (input) {
const response = await openai.createCompletion({
  model:"text-davinci-003",
  prompt:`Convert requests to an array of commands in JSON format. The available actions are Add, Remove, Update. There must be an action and an object. There may be an increase_quantity or decrease_quantity field. If there is no action return null.

Example: Let's have tacos on Tuesday
Output: [{"action":"Add","object":"Tacos"}]

Example: We're going to need more toilet paper!
Output: [{"action":"Update","object":"Toilet paper","increase_quantity":1}]

Example: Get greek yogurt instead of sour cream
Output: [{"action":"Remove","object":"Sour cream"},{"action":"Add","object":"Greek yogurt"}]

Input: ${input}
Output: `,
    temperature:0,
    max_tokens:128,
    top_p:1.0,
    frequency_penalty:0.0,
    presence_penalty:0.0,
  });

  return JSON.parse(response.data.choices[0]?.text);
}
}