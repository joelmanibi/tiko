const { verifySignUp } = require("../../middleware");
const controller = require("../../controllers/manage-partner/station/new-station.controller");
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
  app.post(
    "/api/partner/create-station",
    upload.array(),
    controller.NewStation
  );
};