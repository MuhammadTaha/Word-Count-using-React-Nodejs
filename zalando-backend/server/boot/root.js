'use strict';

const parser = require("../parser")

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);

  server.get('/scrap-web', async function(req, res) {

    console.log(req.query.url)
    var request_url = req.query.url
    // console.log("reached there")
    res.setHeader('Content-Type', 'application/json');
    const result =  await parser.getWebWordCount(request_url)
    

    
    res.send(result);
    
  });

};
