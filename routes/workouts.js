const express = require('express');
const Workouts = require('../controllers/workouts');
const router = express.Router();
/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workouts
 *     description: Retrieve a list of all workouts from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of workouts.
 *       500:
 *         description: Internal server error.
 */
router.get('/', async (req, res) => {
    try {
        const workouts = await Workouts.find();
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     summary: Get a workout by ID
 *     description: Retrieve a single workout by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The workout ID.
 *     responses:
 *       200:
 *         description: Successful response with the workout details.
 *       404:
 *         description: Workout not found.
 */
router.get('/:id', async (req, res) => {
    const workout = await Workouts.findById(req.params.id);
    if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(workout);
});
/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Create a new workout
 *     description: Add a new workout to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     sets:
 *                       type: number    # Changed from string to number
 *                     reps:
 *                       type: number    # Changed from string to number
 *                     weight:
 *                       type: number    # Changed from string to number
 *               duration:
 *                 type: number
 *               rest_time:
 *                 type: number
 *               caloriesBurned:
 *                 type: number
 *     responses:
 *       201:
 *         description: Workout created successfully.
 *       400:
 *         description: Invalid input.
 */

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

/**
 * @swagger
 * /workouts/{id}:
 *   patch:
 *     summary: Update a workout
 *     description: Update an existing workout by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The workout ID.
 *     requestBody:
 *       required: true
  *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     sets:
 *                       type: number    # Changed from string to number
 *                     reps:
 *                       type: number    # Changed from string to number
 *                     weight:
 *                       type: number    # Changed from string to number
 *               duration:
 *                 type: number
 *               rest_time:
 *                 type: number
 *               caloriesBurned:
 *                 type: number
 *     responses:
 *       200:
 *         description: Workout updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Workout not found.
 */
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

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     summary: Delete a workout
 *     description: Delete an existing workout by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The workout ID.
 *     responses:
 *       200:
 *         description: Workout deleted successfully.
 *       404:
 *         description: Workout not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workouts.findByIdAndDelete(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json({ message: 'Successfully deleted' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
