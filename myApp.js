const express = require('express');
const helmet = require('helmet')
const ninetyDaysInSeconds = 90*24*60*60;
let app = express();
//the following passed after a few tries
app.use(
  helmet.hidePoweredBy(
  )
)
//The following should be used instead of the above
//app.disable("x-powered-by")
// Sets "X-Frame-Options: DENY other option = SAMEORIGIN"
app.use(
  helmet.frameguard({
    action: "deny"
  })
)
//disables browsers' buggy cross-site scripting filter
app.use(helmet.xssFilter());
// Sets "X-Content-Type-Options: nosniff"
app.use(helmet.noSniff());
// Sets "X-Download-Options: noopen"
app.use(helmet.ieNoOpen());
// Sets "Strict-Transport-Security: max-age=123456; includeSubDomains"
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true
  })
);
// Sets "X-DNS-Prefetch-Control: off"
app.use(
  helmet.dnsPrefetchControl({
    allow: false,
  })
);

app.use(
  helmet.noCache()
);
// Sets all of the defaults, but overrides script-src
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "trusted-cdn.com"],
    },
  })
);














































module.exports = app;
var api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
