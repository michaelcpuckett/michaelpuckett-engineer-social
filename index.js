require('dotenv').config();
const express = require('express')
const { generateMealPlan } = require('./generateMealPlans');
const { getIngredients } = require('./ingredients');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const nunjucks = require('nunjucks');
const { editList } = require('./editList');
const getGuid = () => randomBytes(16).toString('hex');
const port = process.env.PORT ?? 3000;

(async () => {
  const app = express();
  const mongoClient = new MongoClient(process.env.MONGO_CLIENT_URL ?? 'mongodb://127.0.0.1:27017');
  await mongoClient.connect();
  const mongoDb = mongoClient.db('recipes');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // looks for html in views folder relative to current working directory
  nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    express: app
  });

  app.get('/sign-up', async (req, res) => {
    await mongoDb.collection('profile').replaceOne(
      {
        _id: 'https://shopgenie.com/users/mpuckett/profile',
      },
      {
        firstName: 'Josh',
        groceryLists: [],
        mealPlans: [],
      },
      {
        upsert: true,
      },
    );
    res.send({ success: true, });
    res.end();
  });

  app.get('/', async function(req, res) {
    const profile = await mongoDb.collection('profile').findOne({
      _id: 'https://shopgenie.com/users/mpuckett/profile',
    });
    
    const currentMeals = (await mongoDb.collection('mealPlan').findOne({
      _id: profile.mealPlans?.[0],
    }))?.meals ?? [];

    const mealPlan = await Promise.all(currentMeals.map(async mealId => await mongoDb.collection('meal').findOne({ _id: mealId })));

    const currentRecipes = (await mongoDb.collection('groceryList').findOne({
      _id: profile.groceryLists?.[0],
    }))?.recipes ?? [];

    const allIngredients = [];

    const mealsWithIngredients = await Promise.all(currentRecipes.map(async recipeId => await mongoDb.collection('recipe').findOne({ _id: recipeId })));
    
    mealsWithIngredients.map(recipe => recipe.ingredients).flat().sort((a, b) => a.item > b.item ? 1 : -1).forEach(item => {
      const foundGroceryListItemIndex = allIngredients.findIndex(groceryListItem => groceryListItem.item === item.item);
      if (foundGroceryListItemIndex === -1) {
        allIngredients.push(item);
      } else {
        allIngredients[foundGroceryListItemIndex].quantity = allIngredients[foundGroceryListItemIndex].quantity + item.quantity;
      }
    });

    res.render('index.html', {
      profile,
      mealPlan,
      mealsWithIngredients,
      allIngredients
    });
  });

  app.post('/edit-profile', async (req, res) => {
    const profile = req.body;

    await mongoDb.collection('profile').updateOne(
      {
        _id: 'https://shopgenie.com/users/mpuckett/profile',
      },
      {"$set": profile},
      {
        upsert: true,
      },
    );
    res.send({ success: true, });
    res.end();
  });

  

  app.post('/edit-list', async (req, res) => {
    const input = req.body?.input;
    const output = await editList(input);
    console.log(output);
    res.send({ output, });
    res.end();
  });

  app.post('/generate-meal-plan', async (req, res) => {
    const profile = await mongoDb.collection('profile').findOne({
      _id: 'https://shopgenie.com/users/mpuckett/profile',
    });

    const meals = await generateMealPlan(profile);
    const mealPlanId = `https://shopgenie.com/users/mpuckett/mealPlan/${getGuid()}`;

    for (const meal of meals) {
      const mealId = `https://shopgenie.com/users/mpuckett/meal/${getGuid()}`;
      
      await mongoDb.collection('meal').replaceOne(
        {
          _id: mealId,
        },
        meal,
        {
          upsert: true,
        },
      );
  
      await mongoDb.collection('mealPlan').updateOne(
        {
          _id: mealPlanId,
        },
        {
          $push: {
            meals: {
              $each: [mealId],
            },
          },
        },
        {
          upsert: true,
        },
      );
    }
    
    await mongoDb.collection('profile').updateOne(
      {
        _id: 'https://shopgenie.com/users/mpuckett/profile',
      },
      {
        $push: {
          mealPlans: {
            $each: [mealPlanId],
            $position: 0,
          },
        },
      },
      {
        upsert: true,
      },
    );

    res.send({ success: true, });
    res.end();
  });

  app.post('/generate-grocery-list', async (req, res) => {
    const profile = await mongoDb.collection('profile').findOne({
      _id: 'https://shopgenie.com/users/mpuckett/profile',
    });

    const mealIds = (await mongoDb.collection('mealPlan').findOne({
      _id: profile.mealPlans[0],
    }))?.meals;

    const groceryListId = `https://shopgenie.com/users/mpuckett/groceryList/${getGuid()}`;

    for (const mealId of mealIds) {
      const meal = await mongoDb.collection('meal').findOne({ _id: mealId });
      const ingredients = await getIngredients({
        recipe: meal.name,
        favoriteFoods: profile.favoriteFoods,
        leastFavoriteFoods: profile.leastFavoriteFoods,
        diet: profile.diet,
        dietaryGoals: profile.dietaryGoals,
        cookingFor: profile.cookingFor, 
      });
      const recipeId = `https://shopgenie.com/users/mpuckett/recipe/${getGuid()}`;

      await mongoDb.collection('recipe').replaceOne(
        {
          _id: recipeId,
        },
        {
          name: meal.name,
          ingredients,
        },
        {
          upsert: true,
        },
      );

      await mongoDb.collection('groceryList').updateOne(
        {
          _id: groceryListId,
        },
        {
          $push: {
            recipes: {
              $each: [recipeId],
              $position: 0,
            },
          },
        },
        {
          upsert: true,
        },
      );
    }

    await mongoDb.collection('profile').updateOne(
      {
        _id: 'https://shopgenie.com/users/mpuckett/profile',
      },
      {
        $push: {
          groceryLists: {
            $each: [groceryListId],
            $position: 0,
          },
        },
      },
      {
        upsert: true,
      },
    );

    res.send({ success: true, });
    res.end();
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})();