require('dotenv').config();
const { Configuration,OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    generateReplacementMeals: async function generateReplacementMeals({ meal, favoriteFoods, leastFavoriteFoods, diet, dietaryGoals }) {
        const response = await openai.createCompletion({
        model:"text-davinci-003",
        prompt:`Convert requests to suggest 7 meal options for ${meal} in the format of Array<{ "name": string; }>. The response must be in valid JSON format.

Favorite foods: ${favoriteFoods}

Least favorite foods: ${leastFavoriteFoods}

Restrictions such as allergies or a specific diet (keto, vegan, etc.): ${diet}

Dietary goals: ${dietaryGoals}

Output: `,
            temperature:0.8,
            max_tokens:1000,
            top_p:1.0,
            frequency_penalty:0.0,
            presence_penalty:0.0,
        });

        console.log(response.data.choices[0].text);

        return JSON.parse(response.data.choices[0]?.text);
    }
};