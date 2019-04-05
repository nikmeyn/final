const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

//Routes
app.use('/', require('./client/src/App'));
app.use('/users', require('./routes/users'));

app.listen(PORT, console.log(`Node Server Started on port ${PORT}`));