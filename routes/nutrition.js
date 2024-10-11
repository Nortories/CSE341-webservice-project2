const express = require('express');
const Nutrition = require('../controllers/nutrition');
const router = express.Router();

/**
 * @swagger
 * /nutrition:
 *   get:
 *     summary: Get all nutrition entries
 *     description: Retrieve a list of all nutrition entries.
 *     responses:
 *       200:
 *         description: A list of nutrition entries.
 *       500:
 *         description: Internal server error.
 */
router.get('/', async (req, res) => {
    try {
        const nutrition = await Nutrition.find();
        res.status(200).json(nutrition);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

/**
 * @swagger
 * /nutrition/{id}:
 *   get:
 *     summary: Get nutrition entry by ID
 *     description: Retrieve a single nutrition entry by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the nutrition entry.
 *     responses:
 *       200:
 *         description: A single nutrition entry.
 *       404:
 *         description: Nutrition entry not found.
 */
router.get('/:id', async (req, res) => {
    const nutrition = await Nutrition.findById(req.params.id);
    if (!nutrition) {
        return res.status(404).json({ message: 'Nutrition entry not found' });
    }
    res.status(200).json(nutrition);
});

/**
 * @swagger
 * /nutrition:
 *   post:
 *     summary: Create a new nutrition entry
 *     description: Add a new nutrition entry to the database.
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Nutrition entry created successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/', async (req, res) => {
    const nutrition = new Nutrition({
        userId: req.body.userId,
        date: req.body.date,
        meals: req.body.meals,
        totalCalories: req.body.totalCalories
    });
    try {
        const newNutrition = await nutrition.save();
        res.status(201).json(newNutrition);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

/**
 * @swagger
 * /nutrition/{id}:
 *   patch:
 *     summary: Update a nutrition entry
 *     description: Update an existing nutrition entry by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the nutrition entry.
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Nutrition entry updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Nutrition entry not found.
 */
router.patch('/:id', async (req, res) => {
    const nutrition = await Nutrition.findById(req.params.id);
    if (req.body.userId) {
        nutrition.userId = req.body.userId;
    }
    if (req.body.date) {
        nutrition.date = req.body.date;
    }
    if (req.body.meals) {
        nutrition.meals = req.body.meals;
    }
    if (req.body.totalCalories) {
        nutrition.totalCalories = req.body.totalCalories;
    }
    try {
        const updatedNutrition = await nutrition.save();
        res.status(200).json(updatedNutrition);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

/**
 * @swagger
 * /nutrition/{id}:
 *   delete:
 *     summary: Delete a nutrition entry
 *     description: Delete an existing nutrition entry by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the nutrition entry.
 *     responses:
 *       200:
 *         description: Nutrition entry deleted successfully.
 *       404:
 *         description: Nutrition entry not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', async (req, res) => {
    const nutrition = await Nutrition.findById(req.params.id);
    try {
        await nutrition.remove();
        res.status(200).json({ message: 'Successfully deleted' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;