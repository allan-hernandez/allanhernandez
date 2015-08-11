/*jslint node: true */
'use strict';

var express  = require('express'),
    path = require('path'),
    app = express(),
    dust = require('express-dustjs'),
    links = require('./links'),
    requiredInfo = require('./requiredInfo');

// Dustjs settings
dust._.optimizers.format = function (ctx, node) {
    return node;
};

app.engine('dust', dust.engine({
    useHelpers: true
}));
app.set('view engine', 'dust');
app.set('views', __dirname);
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'static/css')));
app.use(express.static(path.join(__dirname, 'static/font')));
app.use(express.static(path.join(__dirname, 'static/img')));
app.use(express.static(path.join(__dirname, 'static/js')));

app.get('/', function(request, response) {
    response.render('index', requiredInfo);
});

app.get('/resume', function(request, response) {
    response.render('resume', requiredInfo);
});

app.get('/avatar', function(request, response) {
    response.redirect(requiredInfo.avatar);
});

app.get('/background', function(request, response) {
    response.redirect(requiredInfo.background);
});

/**
 * If URL path is found in links.json then redirect
 * else handle 404s by redirecting to home page
 * */
app.get('*', function (request, response){
    var requestedPath = (request.path).replace('/', '').toLowerCase();
    if (links[requestedPath]) {
        response.redirect(links[requestedPath]);
    } else {
        response.redirect('/');
    }
});

console.log('Server started on http://localhost:8080');
app.listen(process.env.PORT || 8080);

module.exports = app;

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-66193604-1', 'auto');
  ga('send', 'pageview');

</script>