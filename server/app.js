const express = require('express');
const app = express();
const api = require('./api');
const morgan = require('morgan'); // logger
const bodyParser = require('body-parser');
const cors = require('cors');

app.set('port', process.env.PORT || 8081);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/api', api);
app.use(express.static('static'));

app.use(morgan('dev'));

app.use(function (req, res) {
  const err = new Error('Not Found');
  err.status = 404;
  res.json(err);
});

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://mattliu:kevin0122@cluster0.eio7d.mongodb.net/virtualstandups?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
  // Add MongoDB connection in later... first just run app.listen (below)
  app.listen(app.get('port'), function () {
    console.log('API Server Listening on port ' + app.get('port') + '!');
  });
});
