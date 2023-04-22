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

app.get('/api/dino', (req, res) => {
    res.send('dinomalin');
});

// function to fetch all messageq
app.get('/api/messages', (req, res) => {
    connection.query('SELECT * FROM `message`', (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

// function to fetch all messages of a channel
function getMessages(channelID) {
    connection.query(
        'SELECT * FROM `message` WHERE channelID = ?',
        [channelID],
        (err, rows, fields) => {
            if (err) throw err;
            return rows;
        }
    );
}
app.get('/api/messages/:channelID', (req, res) => {
    res.send(getMessages(req.params.channelID));
});

// function to fetch active text of a channel
function getActiveText(channelID) {
    connection.query(
        'SELECT active_text_area FROM channel WHERE id = ?',
        [channelID],
        (err, rows, fields) => {
            if (err) throw err;
            return rows;
        }
    );
}
app.get('/api/activeText/:channelID', (req, res) => {
    res.send(getActiveText(req.params.channelID));
});

// function to fetch a user
function getUser(userUUID) {
    connection.query(
        'SELECT name FROM user WHERE uuid = ?',
        [userUUID],
        (err, rows, fields) => {
            if (err) throw err;
            return rows;
        }
    );
}
app.get('/api/user/:userUUID', (req, res) => {
    res.send(getUser(req.params.userUUID));
});

// join a channel = fetch all messages/fetch active text

// function to post a message
function postMessage(channelID, userUUID, content) {
    connection.query(
        'INSERT INTO message (channel_id, user_uuid, content) VALUES (?, ?, ?)',
        [channelID, userUUID, content],
        (err, rows, fields) => {
            if (err) throw err;
            return rows;
        }
    );
}
app.post('/api/messages/send', (req, res) => {
    postMessage(req.body.channelID, req.body.userUUID, req.body.content);
});

// function to create a channel
function createChannel(name, userUUID) {
    connection.query(
        'INSERT INTO channel',
        [name, userUUID],
        (err, rows, fields) => {
            if (err) throw err;
            return rows;
        }
    );
}
app.post('/api/channel', (req, res) => {
    createChannel(req.body.name, req.body.userUUID);
});

//function to modify text area of a channel
function modifyActiveText(channelID, content) {
    connection.query(
        'UPDATE channel SET active_text_area = ? WHERE id = ?',
        [content, channelID],
        (err, rows, fields) => {
            if (err) throw err;
            return rows;
        }
    );
}
app.post('/api/activeText', (req, res) => {
    modifyActiveText(req.body.channelID, req.body.content);
});

function modifyNameUser(userUUID, name) {
    connection.query(
        'UPDATE user SET name = ? WHERE uuid = ?',
        [name, userUUID],
        (err, rows, fields) => {
            if (err) throw err;
            return rows;
        }
    );
}
app.post('/api/nameUser', (req, res) => {
    modifyNameUser(req.body.userUUID, req.body.name);
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000.');
});
