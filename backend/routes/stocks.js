const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Stock = require('../models/stocks');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/auth/getuser". Login required
router.get('/fetchall', fetchuser, async (req, res) => {
    try {
        const notes = await Stock.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required
router.post('/addstock', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
   ], async (req, res) => {
        try {

            const { title } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const stock = new Stock({
                title, user: req.user.id
            })
            const savedNote = await stock.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


module.exports = router