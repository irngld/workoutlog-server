require('dotenv').config();
const express = require('express');
const app = express();
const database = require('./db');
const userCtrl = require('./controllers/user.controller');
const logCtrl = require('./controllers/log.controller');
const validate = require('./middleware/validateSession');

// middleware/headers  HERE
app.use(express.json());


// ############# Controllers #############
app.use('/user', userCtrl);


// ********* VALIDATION REQUIRED TO ACCESS CONTROLLERS BELOW **************
app.use(validate); // <--- sessionValidation
app.use('/log', logCtrl);

// ############# END of Controllers #############



database.sync();

app.listen(process.env.PORT, () => {
    console.log(`App is running on port: ${process.env.PORT}`);
})