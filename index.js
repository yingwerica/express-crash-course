const express = require ('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members')

const app = express();

//init middleware
// app.use(logger);

//handlebar Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false }));


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });



//Members API Routes
app.use('/api/members', require('./routes/api/members'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));

