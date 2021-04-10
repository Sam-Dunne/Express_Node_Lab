const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();


app.use((req, res, next) => {
    // console.log(`incoming req; ${req.url}`);
    next();
});

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.post('/make-chirp', (req, res) => {
    fs.readFile(path.join(__dirname, './chirps.json'), (err, data) => {
        if (err) {
            console.log(err);
                res.sendStatus(500);
                return;
        }
        const chirps = JSON.parse(data);
        chirps.push(req.body);
        fs.writeFile(path.join(__dirname, './chirps.json'), JSON.stringify(chirps, null, 2), (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            res.send('chirp added')
        })
    });
 
});

app.get('/formsubmissions/', (req, res) => {
    const id = req.params.id;

    fs.readFile(path.join(__dirname, './chirps.json'), (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('chirps failed');
            return;
        }
        const chirps = JSON.parse(data);
        res.send(chirps);
    });
});



app.listen(3000, () => console.log('Server on 3000'));