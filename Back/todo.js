const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let heroId = 1;
let abilityId = 5;
const heroes = [];
const abilities = [
    {
        id: 1,
        name: 'Суперсила'
    },
    {
        id: 2,
        name: 'Суперскорость'
    },
    {
        id: 3,
        name: 'Телепортация'
    },
    {
        id: 4,
        name: 'Деньги'
    },
];

app.get('/abilities', (req, res) => {
    setTimeout(() => {
        res.send(abilities);
    }, 2000);
});

app.post('/abilities', (req, res) => {
    abilities.push({
        ...req.body,
        id: abilityId++
    });
    res.json(abilities[abilities.length - 1]);
});
app.get('/heroes', (req, res) => {
    setTimeout(() => {
        res.send(heroes);
    }, 2000);
});

app.post('/heroes', (req, res) => {
    heroes.push({
        ...req.body,
        id: heroId++
    });

    res.json(heroes[heroes.length - 1]);
});

app.put('/heroes/:itemId', (req, res) => {
    const foundItem = heroes.find(item => item.id === parseInt(req.params.itemId));

    Object.keys(req.body).forEach(key => {
        if (key !== 'id') {
            foundItem[key] = req.body[key];
        }
    });

    res.json(foundItem);
});

app.listen(3000, () => {
    console.log('listening on 3000...');
});