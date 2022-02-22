const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
// do hashowania hasła
const User = require('../models/User');

router.get('/', async (req, res) => {
    User.find(function (err, result) {
        if (err) return res.send(err)
        else return res.send(result)
    })
});

router.get('/:id', async (req, res) => {
    User.findById(ObjectId(req.params.id), function (err, result) {
        if (err) return res.send(err)
        else return res.send(result)
    })
});


// rejestracja
router.post('/', async (req, res) => {
    const{login,name,email,password}= req.body;
    let hash = undefined;
    try {
        hash = await argon2.hash(password);
    } catch(err) {
        console.log(err);
    }
    const newUser = new User({ login:login ,name:name, email:email, password:hash})
    newUser.save(function (err, result) {
        if (err) res.send(err)
        else res.send(result)
    })
});


// logowanie

router.post('/login', async (req,res) => {
    const {login,password} =req.body
    const userToLogIn = await User.find({"login": `${login}`})
    if(userToLogIn.length === 0) { res.status(400).send("User doesn't exist"); return};
    if(await argon2.verify(userToLogIn[0].password, password)){
        res.send(userToLogIn)
    }
    else {
        res.status(400).send("Wrong password")
    }
    return;
})

router.put('/:id', async (req, res) => {
    User.replaceOne({ _id: ObjectId(req.params.id) }, {
        login: req.body.login,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, function (err, result) {
        if (err) res.send(err)
        else res.send(result)
    })
});

router.delete('/:id', async (req, res) => {
    User.deleteOne({ _id: ObjectId(req.params.id) }, function (err, result) {
        if (err) res.send(err)
        else res.send(result)
    })
});

router.patch('/:id', async (req, res) => {
    User.updateOne({ _id: ObjectId(req.params.id) }, req.body, function (err, result) {
        if (err) res.send(err)
        else res.send(result)
    })
})

module.exports = router;
