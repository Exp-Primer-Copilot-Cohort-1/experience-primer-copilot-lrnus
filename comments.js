// Create a web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Setup the view engine
app.set('view engine', 'ejs');

// Setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Setup the static assets directories
app.use('/css', express.static('assets/css'));
app.use('/img', express.static('assets/img'));

// Setup the comments array
const comments = [
  { name: 'John', message: 'Hello there!' },
  { name: 'Mary', message: 'How are you?' },
];

// Setup the root route
app.get('/', (req, res) => {
  res.render('index', { comments: comments });
});

// Setup the post route
app.post('/', (req, res) => {
  comments.push({ name: req.body.name, message: req.body.message });
  res.redirect('/');
});

// Setup the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});