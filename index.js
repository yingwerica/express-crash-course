const express = require ('express');
const { parse } = require('path');
const path = require('path');
const members = require('./members');

const logger = require('./middleware/logger.js');

const app = express();



//init middleware
// app.use(logger);

//gets all members
app.get('/api/members', (req, res) => res.json(members));

//get single member
app.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    // res.send(req.params.id);
    if(found) {
      res.json(members.filter(member => member.id === parseInt(req.params.id)));  
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
    
})


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));

