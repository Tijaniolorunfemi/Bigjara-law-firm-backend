const router = require('express').Router();
let Info = require('../models/info.model');

router.route('/').get((req , res) => {
    Info.find()
    .then(info => res.json (info))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req , res) => {
    const username = req.body.username ;
    const password = req.body.password ; 
    const email = req.body.email ;
    const date = Date.parse(req.body.date);  

    const newInfo = new Info({
        username,
        password,
        email,
        date,
    })

    newInfo.save()
    .then(() => res.json('info added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req , res) => {
    Info.findById(req.params.id)
        .then(info => res.json(info))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req , res) => {
    Info.findByIdAndDelete(req.params.id)
        .then(() => res.json('info deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req , res) => {
    Info.findById(req.params.id)
        .then(info => {
            info.username = req.body.username ;
            info.password = req.body.password ;
            info.email = req.body.email ;
            info.date = Date.parse(req.body.date);

            info.save()
                .then(() => res.json('info updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;