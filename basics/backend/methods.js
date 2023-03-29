const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});



let user = [
    {
        'id': 1,
        'name' : 'Ashish'
    },
    {
        'id': 2,
        'name' : 'Mohan'
    },
    {
        'id': 3,
        'name' : 'kartik'
    }
];

app.get('/user', (req, res) => {
    console.log(req.query);
    res.send(user);
});

app.post('/user', (req, res) => {
    console.log(req.body);
    user = req.body;
    res.json({
        message: 'User created successfully',
        user : req.body
    });
});

app.patch('/user', (req, res) => {
    console.log(req.body);

    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated)
    {
        user[key] = dataToBeUpdated[key];    
    }

    res.json({
        message : "data updated successfully"
    })

});

app.delete('/user', (req, res) => {
    user = {};
    res.json({
        message : "data deleted successfully"
    })
});


// using params...

app.get('/users/:id', (req, res) => {
    res.send({
        message : 'user id recieved'
    });
    console.log(req.params.id);
});