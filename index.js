require('dotenv').config();
const express = require('express')
const { generateMealPlan } = require('./generateMealPlans');
const { generateImage } = require('./generateImage');
const { getSuggestions } = require('./getSuggestions');
const { generateReplacementMeals } = require('./generateReplacementMeals');
const { getIngredients } = require('./ingredients');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const nunjucks = require('nunjucks');
const { editList } = require('./editList');
const getGuid = () => randomBytes(16).toString('hex');
const path = require('path');
const port = process.env.PORT ?? 3000;

(async () => {
  const app = express();
  app.use(express.static(path.resolve(__dirname, './static')));
  const mongoClient = new MongoClient(process.env.MONGO_CLIENT_URL ?? 'mongodb://127.0.0.1:27017');
  await mongoClient.connect();
  const mongoDb = mongoClient.db('recipes');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // looks for html in views folder relative to current working directory
  const nunjucksConfig = nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    express: app
  });

  nunjucksConfig.addFilter('getId', (url) => {
    try {
      const parts = new URL(url).pathname.split('/');
      return parts[parts.length - 1];
    } catch (error) {
      return '';
    }
  });

  nunjucksConfig.addFilter('splitOnComma', (string) => {
    return (string || '').split(', ');
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

  app.get('/', async (req, res) => {
    res.render('index.html');
  });

  app.post('/get-suggestions', async function(req, res) {
    const query = req.body?.query;
    if (!query) {
      res.send([]);
      res.end();
    } else {
      const suggestions = await getSuggestions(query);
      res.send(suggestions);
      res.end();
    }
  });

  app.get('/edit-profile', async function(req, res) {
    const profile = await mongoDb.collection('profile').findOne({
      _id: 'https://shopgenie.com/users/mpuckett/profile',
    });

    const foodData = [{
      type: 'Protein',
      items: [{
        name: 'Chicken',
        imageUrl: 'chicken.png',
      }, {
        name: 'Hamburger',
        imageUrl: 'hamburger.png',
      }, {
        name: 'Beef',
        imageUrl: 'beef.png',
      }, {
        name: 'Pork',
        imageUrl: 'pork.png',
      }, {
        name: 'Tuna',
        imageUrl: 'tuna.png',
      }, {
        name: 'Salmon',
        imageUrl: 'salmon.png',
      }, {
        name: 'Eggs',
        imageUrl: 'eggs.png',
      }, {
        name: 'Cheese',
        imageUrl: 'cheese.png',
      }, {
        name: 'Yogurt',
        imageUrl: 'yogurt.png',
      }, {
        name: 'Tofu',
        imageUrl: 'tofu.png',
      }, {
        name: 'Hummus',
        imageUrl: 'hummus.png',
      }, {
        name: 'Peanut Butter',
        imageUrl: 'peanut-butter.png',
      }, {
        name: 'Pistachios',
        imageUrl: 'pistachios.png'
      }, {
        name: 'Almonds',
        imageUrl: 'almonds.png',
      }]
    }, {
      type: 'Fruits',
      items: [{
        name: 'banana',
        imageUrl: 'banana.png',
      }, {
        name: 'apple',
        imageUrl: 'apple.png',
      }, {
        name: 'orange',
        imageUrl: 'orange.png',
      }, {
        name: 'grapes',
        imageUrl: 'grapes.png',
      }, {
        name: 'strawberries',
        imageUrl: 'strawberries.png',
      }, {
        name: 'raspberries',
        imageUrl: 'raspberries.png',
      }, {
        name: 'watermelon',
        imageUrl: 'watermelon.png',
      }, {
        name: 'peach',
        imageUrl: 'peach.png',
      }, {
        name: 'pineapple',
        imageUrl: 'pineapple.png',
      }, {
        name: 'kiwi',
        imageUrl: 'kiwi.png',
      }, {
        name: 'mango',
        imageUrl: 'mango.png',
      }, {
        name: 'blueberries',
        imageUrl: 'blueberries.png',
      }, {
        name: 'blackberries',
        imageUrl: 'blackberries.png',
      }, {
        name: 'cherries',
        imageUrl: 'cherries.png',
      }, {
        name: 'pear',
        imageUrl: 'pear.png',
      }, {
        name: 'grapefruit',
        imageUrl: 'grapefruit.png',
      }]
    }, {
      type: 'Vegetables',
      items: [{
        name: 'Carrots',
        imageUrl: 'carrots.png',
      }, {
        name: 'Broccoli',
        imageUrl: 'broccoli.png',
      }, {
        name: 'Bell peppers',
        imageUrl: 'bell-peppers.png',
      }, {
        name: 'Spinach',
        imageUrl: 'spinach.png',
      }, {
        name: 'Kale',
        imageUrl: 'kale.png',
      }, {
        name: 'Onions',
        imageUrl: 'onions.png',
      }, {
        name: 'Tomatoes',
        imageUrl: 'tomatoes.png',
      }, {
        name: 'Eggplant',
        imageUrl: 'eggplant.png',
      }, {
        name: 'Potatoes',
        imageUrl: 'potatoes.png',
      }, {
        name: 'Peas',
        imageUrl: 'peas.png',
      }, {
        name: 'Green beans',
        imageUrl: 'green-beans.png',
      }, {
        name: 'Corn',
        imageUrl: 'corn.png',
      }, {
        name: 'Asparagus',
        imageUrl: 'asparagus.png',
      }, {
        name: 'Artichokes',
        imageUrl: 'artichokes.png',
      }]
    }, {
      type: 'Grains',
      items: [{
        name: 'Sandwiches',
        imageUrl: 'sandwich.png',
      }, {
        name: 'Rice',
        imageUrl: 'rice.png',
      }, {
        name: 'Pasta',
        imageUrl: 'pasta.png',
      }, {
        name: 'Oatmeal',
        imageUrl: 'oatmeal.png',
      }, {
        name: 'Cereal',
        imageUrl: 'cereal.png',
      }]
    }, {
      type: 'Cuisines',
      items: [{
        name: 'American food',
        imageUrl: 'american.png',
      }, {
        name: 'Mexican food',
        imageUrl: 'mexican.png',
      }, {
        name: 'Chinese food',
        imageUrl: 'chinese.png'
      }, {
        name: 'Sushi',
        imageUrl: 'sushi.png',
      }, {
        name: 'Indian food',
        imageUrl: 'indian.png',
      }]
    }];

    res.render('edit-profile.html', {
      profile,
      foodData,
    });
  });

  app.get('/meal-plan', async function (req, res) {
    const profile = await mongoDb.collection('profile').findOne({
      _id: 'https://shopgenie.com/users/mpuckett/profile',
    });
    
    const currentMeals = (await mongoDb.collection('mealPlan').findOne({
      _id: profile.mealPlans?.[0],
    }))?.meals ?? [];

    const mealPlan = await Promise.all(currentMeals.map(async mealId => await mongoDb.collection('meal').findOne({ _id: mealId })));

    res.render('meal-plan.html', {
      profile,
      mealPlan,
    });
  });

  app.get('/grocery-list', async (req, res) => {
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

    res.render('grocery-list.html', {
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

  app.post('/delete-meal', async (req, res) => {
    const id = req.body?.id;

    const profile = await mongoDb.collection('profile').findOne({
      _id: 'https://shopgenie.com/users/mpuckett/profile',
    });

    await mongoDb.collection('mealPlan').updateOne(
      {
        _id: profile.mealPlans?.[0],
      },
      {
        $pull: {
          meals: id,
        },
      },
      {
        upsert: true,
      },
    );

    res.send({ success: true, });
    res.end();
  });

  
  app.post('/replace-meal', async (req, res) => {
    const id = req.body?.id;
    const name = req.body?.name;
    const position = req.body?.position;

    const profile = await mongoDb.collection('profile').findOne({
      _id: 'https://shopgenie.com/users/mpuckett/profile',
    });

    const originalMeal = await mongoDb.collection('meal').findOne({
      _id: id,
    });

    const mealId = `https://shopgenie.com/users/mpuckett/meal/${getGuid()}`;

    const meal = {...originalMeal, name};

    delete meal._id;
      
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
        _id: profile.mealPlans[0],
      },
      {
        $pull: {
          meals: [originalMeal._id],
        }
      },
      {
        upsert: true,
      }
    );
    
    await mongoDb.collection('mealPlan').updateOne(
      {
        _id: profile.mealPlans[0],
      },
      {
        $push: {
          meals: {
            $each: [mealId],
            $position: parseInt(position, 10),
          },
        },
      },
      {
        upsert: true,
      },
    );

    res.send({ success: true });
    res.end();
  });

  app.post('/generate-replacement-meals', async (req, res) => {
    const meal = req.body?.meal;

    const profile = await mongoDb.collection('profile').findOne({
      _id: 'https://shopgenie.com/users/mpuckett/profile',
    });

    const replacementMeals = await generateReplacementMeals({
      ...profile,
      meal,
    });

    res.send(replacementMeals);
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