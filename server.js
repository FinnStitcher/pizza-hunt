const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// creating db connection with mongoose
// mongoose will create the database if its not found
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pizza-hunt',
    // these are deprecated
    // {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }
);

// log if mongo queries are being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));