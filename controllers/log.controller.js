const router = require('express').Router();
const Log = require('../models/log');
const validate = require('../middleware/validateSession');



// POST : Allows users to create a workout log with descriptions, definitions, results, and owner properties.
router.post('/', (req, res) => {
    Log.create({
        description: req.body.description,
        definition:  req.body.definition,
        result:      req.body.result,
        owner_id:    req.body.owner_id
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }))
})



// GET : Gets all logs for an individual user.
router.get('/', validate, (req, res) => {
    let userid = req.user.id;
    Log.findAll({
        where: {
            owner_id: userid,
        }
    })
    .then(logs => res.status(200).json({ message: `Found logs!`, logs }))
    .catch(err => res.status(500).json({ message: "Oops! Something went wrong.", error: err}))
})



// GET : Gets individual ID logs by ID for an individual user.
router.get('/:id', validate, (req, res) => {
    let userid = req.user.id;
    Log.findAll({
        where: {
            owner_id: userid,
            id:       req.params.id
        }
    })
    .then(logs => res.status(200).json({ message: `Found logs!`, logs }))
    .catch(err => res.status(500).json({ message: "Oops! Something went wrong.", error: err}))
})



// PUT : Allows individual logs to be updated by a user.
router.put('/:id', validate, (req, res) => {
    Log.update(req.body, { 
        where: { 
            id: req.params.id 
        }
    })
    .then(logUpdated => res.status(200).json({ message: "Update complete!", logUpdated }))
    .catch(err => res.status(500).json({ message: "Not updated.", error: err }))
})


// DELETE : Allows individual logs to be deleted by a user.
router.delete('/:id', validate, (req, res) => {
    let userid = req.user.id;
    Log.destroy({
        where: {
            owner_id: userid,
            id: req.params.id
        }
    })
    .then(purged => res.status(200).json({ message: `Log ${req.params.id} has been removed!`, purged }))
    .catch(err => res.status(500).json({message: "Something went wrong.", error: err}))
})


module.exports = router;