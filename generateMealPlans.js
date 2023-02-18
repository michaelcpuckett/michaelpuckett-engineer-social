require('dotenv').config();
const { Configuration,OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// const input = `I really like chicken. I have it most days, but I get tired of having it the same way all the time, so I'm looking for a variety. We have Taco Tuesdays for dinner on Tuesday. I have my daughter on Wednesday nights and every other weekend (Friday-Sunday). Otherwise I'm just cooking for me and my partner. No allergies. Neither of us like corn or onions.`;

module.exports = {
    generateMealPlan: async function generateMealPlan({ favoriteFoods, leastFavoriteFoods, diet, dietaryGoals }) {
        const response = await openai.createCompletion({
        model:"text-davinci-003",
        prompt:`Convert requests to make a 7-day meal plan in JSON format, from 0-6 for Monday-Sunday, and 0-3 for Breakfast/Lunch/Dinner/Snack in the format of [{"day":0,"meal":0,"name":"Eggs benedict"}].

Favorite foods: ${favoriteFoods}

Least favorite foods: ${leastFavoriteFoods}

Restrictions such as allergies or a specific diet (keto, vegan, etc.): ${diet}

Dietary goals: ${dietaryGoals}

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