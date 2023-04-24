const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const util = require('util');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatbox',
    port: '3306',
});
const query = util.promisify(connection.query).bind(connection);

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

// function to fetch all messages
app.get('/api/messages', (req, res) => {
    connection.query('SELECT * FROM `message`', (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
});

// SELECT message.content, message.id, message.timestamp, message.user_uuid, message.channel_id, user.name, channel.active_text_area FROM `message` JOIN `user` ON message.user_uuid = user.uuid JOIN `channel` ON message.channel_id = channel.id WHERE message.channel_id = 1
// function to fetch last 20 messages of a channel
async function getMessages(channelID, all) {
    const req = all
        ? await query(
              'SELECT message.*, user.name FROM `message` JOIN `user` ON message.user_uuid = user.uuid WHERE message.channel_id = ? ORDER BY message.id DESC LIMIT 20',
              [channelID]
          )
        : await query(
              'SELECT message.*, user.name FROM `message` JOIN `user` ON message.user_uuid = user.uuid WHERE message.channel_id = ? ORDER BY message.id DESC LIMIT 1',
              [channelID]
          );
    return req;
}
app.get('/api/messages/:channelID', async (req, res) => {
    const result = await getMessages(req.params.channelID, req.query.all);
    res.send(result);
});

// function to fetch active text of a channel
async function getActiveText(channelID) {
    channelID = parseInt(channelID);
    const req = await query(
        'SELECT active_text_area FROM channel WHERE id = ?',
        [channelID]
    );
    return req;
}
app.get('/api/activeText/:channelID', async (req, res) => {
    const result = await getActiveText(req.params.channelID);
    res.send(result);
});

// function to fetch a user
async function getUser(userUUID) {
    const req = await query('SELECT name FROM `user` WHERE uuid = ?', [
        userUUID,
    ]);
    return req;
}
app.get('/api/user/:userUUID', async (req, res) => {
    const result = await getUser(req.params.userUUID);
    res.send(result);
});

// function to create a user
function createUser(uuid) {
    connection.query(
        'INSERT INTO user (uuid) VALUES (?)',
        [uuid],
        (err, rows, fields) => {
            if (err) throw err;
            return rows;
        }
    );
}
app.post('/api/user', (req, res) => {
    createUser(req.body.uuid);
});

// join a channel = fetch all messages/fetch active text

// function to post a message
function postMessage(channelID, userUUID, content) {
    const test = connection.query(
        'INSERT INTO message (channel_id, user_uuid, content) VALUES (?, ?, ?)',
        [channelID, userUUID, content],
        (err, rows, fields) => {
            if (err) throw err;
            return rows;
        }
    );
    console.log(test.err);
}
app.post('/api/messages/send', (req, res) => {
    if (req.body) {
        console.log(req.body);
        postMessage(req.body.channelID, req.body.userUUID, req.body.content);
    }
});

// function to create a channel
function createChannel() {
    connection.query('INSERT INTO channel VALUES ()', (err, rows, fields) => {
        if (err) throw err;
        return rows;
    });
}
app.post('/api/channel', (req, res) => {
    createChannel();
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
    console.log(req.body);
    modifyNameUser(req.body.userUUID, req.body.name);
});

// fonction pour vérifier si un channel existe
async function checkChannel(channelID) {
    const req = await query('SELECT * FROM channel WHERE id = ?', [channelID]);
    return req;
}
app.get('/api/channelCheck/:channelID', (req, res) => {
    res.send(checkChannel(req.params.channelID));
});

// function to get the last channel
async function getLastChannel() {
    const req = await query('SELECT MAX(id) FROM channel');
    return req;
}
app.get('/api/lastChannel', (req, res) => {
    res.send(getLastChannel());
});

app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001.');
});
