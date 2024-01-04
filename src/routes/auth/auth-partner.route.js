const { verifySignUp } = require("../../middleware");
const controller = require("../../controllers/authentification/auth-partner.controller");
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
    "/api/auth/partner/signup-admin",
    controller.signupPartnerAdmin
  );

  app.post(
    "/api/auth/partner/signin-admin",
    upload.array(),
    controller.signinPartner
    );

};