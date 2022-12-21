const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Stock = require('../models/stocks');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/auth/getuser". Login required
router.get('/fetchall', fetchuser, async (req, res) => {
    try {
        const stocks = await Stock.find({ user: req.user.id });
        res.json(stocks)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required
router.post('/addstock', fetchuser, async (req, res) => {
        try {

            const { title,name } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const stock = new Stock({
                title,name, user: req.user.id
            })
            const savedNote = await stock.save()

            res.json(savedNote.title)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    router.post('/deletestock/:id', fetchuser, async (req, res) => {
      try {
    let del=await Stock.findByIdAndRemove(req.params.id).then(
       
        res.json({success:true})
    )
       
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }

    })


module.exports = router