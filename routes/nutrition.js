const express = require('express');
const Nutrition = require('../controllers/nutrition');
const router = express.Router();

// all rest routes for nutrition

// GET all
router.get('/', async (req, res) => {
    try {
        const nutrition = await Nutrition.find();
        res.status(200).json(nutrition);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// GET by id
router.get('/:id', async (req, res) => {
    const nutrition = await Nutrition.findById(req.params.id);
    if (!nutrition) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(nutrition);
});

// POST create
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

// PATCH update
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

// DELETE by id
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