const express = require('express');
const Workouts = require('../controllers/workouts');
const router = express.Router();

// all rest routes for workouts

// GET all
router.get('/', async (req, res) => {
    try {
        const workouts = await Workouts.find();
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET by id
router.get('/:id', async (req, res) => {
    const workout = await Workouts.findById(req.params.id);
    if (!workout) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(workout);
});

// POST create
router.post('/', async (req, res) => {
    const workout = new Workouts({
        title: req.body.title,
        date: req.body.date,
        exercises: req.body.exercises,
        duration: req.body.duration,
        rest_time: req.body.rest_time,
        caloriesBurned: req.body.caloriesBurned
    });
    try {
        const newWorkout = await workout.save();
        res.status(201).json(newWorkout);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// PATCH update
router.patch('/:id', async (req, res) => {
    const workout = await Workouts.findById(req.params.id);
    if (req.body.userId) {
        workout.userId = req.body.userId;
    }
    if (req.body.date) {
        workout.date = req.body.date;
    }
    if (req.body.exercises) {
        workout.exercises = req.body.exercises;
    }
    if (req.body.duration) {
        workout.duration = req.body.duration;
    }
    if (req.body.caloriesBurned) {
        workout.caloriesBurned = req.body.caloriesBurned;
    }
    try {
        const updatedWorkout = await workout.save();
        res.status(200).json(updatedWorkout);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// DELETE by id
router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workouts.findByIdAndDelete(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Contact id:' + req.params.id + ' not found' });
        }
        res.status(200).json({ message: 'Successfully ' + req.params.id + ' deleted' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;