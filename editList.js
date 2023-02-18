require('dotenv').config();
const { Configuration,OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const input = `Hi Tommy. Let's get milk, eggs, and bread for breakfast. Can you get 2 things of pizza rolls instead of 1? Forget the cheese.`;

(async () => {
const response = await openai.createCompletion({
  model:"text-davinci-003",
  prompt:`Convert requests to an array of commands in JSON format. The available actions are Add, Remove, Update. There must be an action and an object. There may be an increase_quantity or decrease_quantity field. If there is no action return null.

Example: Let's have tacos on Tuesday
Output: [{"action":"Add","object":"Tacos"}]

Example: We're going to need more toilet paper!
Output: [{"action":"Update","object":"Toilet paper","increase_quantity":1}]

Example: Forget the eggs. I want to make avocado toast for breakfast this week
Output: [{"action":"Remove","object":"Eggs"},{"action":"Add","object":"Avocado toast"}]

Now generate the following:

Input: ${input}
Output: `,
    temperature:0,
    max_tokens:128,
    top_p:1.0,
    frequency_penalty:0.0,
    presence_penalty:0.0,
  });

  console.log(JSON.parse(response.data.choices[0]?.text));
})();