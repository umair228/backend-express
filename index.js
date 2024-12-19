import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let teaData= [];
let nextId = 1;

//add a new tea
app.post('/tea', (req, res) => {
    const {name, price}= req.body;
    if (!name || !price) {
        res.status(400).json({error: 'name and price are requi red'});
        return;
    }

    const newTea = {
        id: nextId++,
        name: name,
        price: price
    }
    teaData.push(newTea);
    res.status(201).send(newTea);
}
);
//get all teas
app.get('/tea', (req, res) => {
    res.status(200).send(teaData);
});

//get a tea by id
app.get('/tea/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tea = teaData.find(tea => tea.id === id);
    if (!tea) {
        res.status(404).json({error: 'tea not found'});
        return;
    }
    res.status(200).send(tea);
}
);


//update a tea by id
app.put('/tea/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tea = teaData.find(tea => tea.id === id);
    if (!tea) {
        res.status(404).json({error: 'tea not found'});
        return;
    }
    const {name, price} = req.body;
    if (name) {
        tea.name = name;
    }
    if (price) {
        tea.price = price;
    }
    res.status(200).send(tea);
}
);

//delete a tea by id

app.delete('/tea/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = teaData.findIndex(tea => tea.id === id);
    if (index === -1) {
        res.status(404).json({error: 'tea not found'});
        return;
    }
    teaData.splice(index, 1);
    res.status(204).send('deleted successfully');
}
);




app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
})

