const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatbox',
});

connection.connect((err) => {
    if (err) {
        console.error(
            'Erreur de connexion à la base de données MySQL: ' + err.stack
        );
        return;
    }

    console.log('Connexion à la base de données MySQL réussie.');
});

app.get('/dino', (req, res) => {
    res.send('dinomalin');
});

app.get('/messages', (req, res) => {
    connection.query('SELECT * FROM `message`', (err, rows, fields) => {
        if (err) throw err;

        res.send(rows);
    });
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000.');
});
