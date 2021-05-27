const express = require('express');

const app = express();

app.set('view engine', 'pug');

const indexRoute = require('./routes');
const aboutRoute = require('./routes/about');

app.use('/static', express.static('public'));

app.use('/', indexRoute);
app.use('/about', aboutRoute);

app.use((req, res, next) => {
    res.status(404).render('not-found');
});

app.use((err, req, res, next) => {

    if (err.status === 404) {
      res.status(404).render('not-found', { err });
    } else {
      err.message = err.message || `Oops!  It looks like something went wrong on the server.`;
      res.status(err.status || 500).render('error', { err });
    };
});

app.listen(3000, () => {
    console.log('listen on port 3000');
});
