const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: "Miso Soup",
      level: "Easy Peasy",
      ingredients: ["Tofu", "Seaweed"],
      cuisine: "Japanese",
      dishType: "soup",
      duration: 5,
      creator: "Taka's ancestor",
      created: "1757-01-27",
    });
  })
  .then((newRecipe) => {
    console.log(newRecipe.title);
    return Recipe.insertMany(data);
  })
  .then((recipesArray) => {
    recipesArray.forEach((recipe) => {
      console.log(recipe.title);
    });
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("Successfully updated!");
    return Recipe.deleteOne({
      title: "Carrot Cake",
    });
  })
  .then(() => {
    console.log("Successfully deleted!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
