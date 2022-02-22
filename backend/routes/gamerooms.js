const express = require('express');
const router = express.Router();

const Gameroom = require('../models/Gameroom');

function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const startTiles = [
    { id: 1, value: 1, isPicked: false }, { id: 2, value: 1, isPicked: false },
    { id: 3, value: 2, isPicked: false }, { id: 4, value: 2, isPicked: false },
    { id: 5, value: 3, isPicked: false }, { id: 6, value: 3, isPicked: false },
    { id: 7, value: 4, isPicked: false }, { id: 8, value: 4, isPicked: false },
    { id: 9, value: 5, isPicked: false }, { id: 10, value: 5, isPicked: false },
    { id: 11, value: 6, isPicked: false }, { id: 12, value: 6, isPicked: false },
    { id: 13, value: 7, isPicked: false }, { id: 14, value: 7, isPicked: false },
    { id: 15, value: 8, isPicked: false }, { id: 16, value: 8, isPicked: false },
    { id: 17, value: 9, isPicked: false }, { id: 18, value: 9, isPicked: false },
    { id: 19, value: 10, isPicked: false }, { id: 20, value: 10, isPicked: false },
    { id: 21, value: 11, isPicked: false }, { id: 22, value: 11, isPicked: false },
    { id: 23, value: 12, isPicked: false }, { id: 24, value: 12, isPicked: false },
    { id: 25, value: 13, isPicked: false }, { id: 26, value: 13, isPicked: false },
    { id: 27, value: 14, isPicked: false }, { id: 28, value: 14, isPicked: false },
    { id: 29, value: 15, isPicked: false }, { id: 30, value: 15, isPicked: false }
]

router.get('/', async (req, res) => {
    Gameroom.find(function (err, result) {
        if (err) return res.send(err)
        else return res.send(result)
    })
});

router.get('/:id', async (req, res) => {
    Gameroom.findById(req.params.id, function (err, result) {
        if (err) return res.send(err)
        else return res.send(result)
    })
});

router.post('/', async (req, res) => {
    var shuffledTiles = shuffle(startTiles)

    const newGameroom = new Gameroom({
        name: req.body.name,
        currentPlayerId: req.body.currentPlayerId,
        players: req.body.players,
        tiles: shuffledTiles
    })
    newGameroom.save(function (err, result) {
        if (err) res.send(err)
        else res.send(result)
    })
});

router.put('/:id', async (req, res) => {
    Gameroom.replaceOne({ _id: req.params.id }, req.body, function (err, result) {
        if (err) res.send(err)
        else res.send(result)
    })
});

router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    Gameroom.deleteOne({ _id: req.params.id }, function (err, result) {
        if (err) res.send(err)
        else res.send(result)
    })
});

router.patch('/:id', async (req, res) => {
    console.log(req.body)
    Gameroom.updateOne({ _id: req.params.id }, req.body, function (err, result) {
        if (err) res.send(err)
        else res.send(result)
    })
})

module.exports = router;