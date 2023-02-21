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
        prompt:`Convert requests to suggest 7 options for names of meals in valid JSON format.

Consideration 1: Foods to omit: ${leastFavoriteFoods}

Consideration 2: Restrictions such as allergies or a specific diet (keto, vegan, etc.): ${diet}

Consideration 3: Dietary goals: ${dietaryGoals}

Meal to replace: ${meal}

Remember the output must be in valid JSON format. Suggest 7 options for meals instead of ${meal}.

Output format: { "suggestions": [ "broccoli and cheese" ] }

Output: `,
            temperature:0.2,
            max_tokens:1000,
            top_p:1.0,
            frequency_penalty:0.0,
            presence_penalty:0.0,
        });

        console.log(response.data.choices[0].text);

        return JSON.parse(response.data.choices[0]?.text);
    }
};