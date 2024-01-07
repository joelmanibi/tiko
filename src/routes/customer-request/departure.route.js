const { verifyDuplicate } = require("../../middleware");
const controller = require("../../controllers/customer-request/departure/search-departure.controller");
var multer = require('multer');
var upload = multer();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/customer/search-departure/:date/:from/:to",
    upload.array(),
    controller.searchdeparture
  );
};