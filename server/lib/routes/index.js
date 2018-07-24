'use strict';

var router = function router(app) {
  app.get('/', function (req, res, next) {
    res.send('hello world');
  });
};

module.exports = router;
//# sourceMappingURL=index.js.map
