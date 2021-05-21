const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('build'));

const url = 'mongodb://localhost:27017/groupster';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error: '));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
