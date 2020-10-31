const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: "genres 1"},
    { id: 2, name: "genres 2"},
    { id: 3, name: "genres 3"},
];

function validateVivid(genres){
    const schema = {
       name: Joi.string().min(3).required(), 
    };
    return Joi.validate(genres, schema);
};

router.get('/', (req, res) =>{
    res.send(genres);
});

router.get('/:id',(req, res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre ID does not exist!");
    res.send(genre);
});

router.post('/', (req, res)=>{
    const { error } = validateVivid(req.body);
    if(!error) return res.status(404).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name,
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id',(req, res)=>{
    const vivid = genres.find(c =>c.id === parseInt(req.params.id));
    if(!vivid) return res.status(404).send('genres Doesn’t exist');
    const { error } = validateVivid(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    vivid.name = req.body.name;
    res.send(vivid);
});

router.delete('/:id',(req, res)=>{
    const vivid = genres.find(c=>c.id === parseInt(req.params.id));
    if(!vivid) res.status(404).send('Genres doesn’t exist');
    const index = genres.indexOf(vivid);
    genres.splice(index, 1);
    res.send(vivid);
});

module.exports = router;