module.exports = function (router) {
  router.get('/', function (req, res) {
    res.render('home', {});
  });
  return router;
};