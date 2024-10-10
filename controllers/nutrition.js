const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  meals: [
    {
      mealType: {
        type: String,
        required: true
      },
      foodItems: [
        {
          name: {
            type: String,
            required: true
          },
          calories: {
            type: Number,
            required: true
          },
          protein: {
            type: Number,
            required: true
          },
          carbohydrates: {
            type: Number,
            required: true
          },
          fat: {
            type: Number,
            required: true
          }
        }
      ]
    }
  ],
  totalCalories: {
    type: Number,
    required: false
  }
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;