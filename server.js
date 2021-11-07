const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));
app.use(cors());


const useRoutes = require('./routes/routes');
useRoutes(app)


const PORT = process.env.PORT || 8000
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zl9zm.mongodb.net/Doctors_Portal`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is connected at http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.log(error);
    })
