require('dotenv').config();
const { Configuration,OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    getSuggestions: async function getSuggestions(input) {
        const response = await openai.createCompletion({
        model:"text-davinci-003",
        prompt:`You are an autocomplete engine. Convert partial inputs to up to 5 food suggestions in valid JSON format.

Example Input: br
Example Output: { "suggestions": [ "broccoli", "brown rice", "breakfast foods", "brussels sprouts" ] }

Input: ${input}
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