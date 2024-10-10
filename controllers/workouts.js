const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: {
    type:String,
    require: true
  },
    date: {
    type: Date,
    required: true
  },
  exercises: [
    {
      name: {
        type: String,
        required: true
      },
      sets: {
        type: Number,
        required: true
      },
      reps: {
        type: Number,
        required: true
      },
      weight: {
        type: Number,
        required: false
      }
    }
  ],
  duration: {
    type: Number,
    required: true
  },
  rest_time: {
    type: Number,
    require: false
  },
  caloriesBurned: {
    type: Number,
    required: false
  }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;