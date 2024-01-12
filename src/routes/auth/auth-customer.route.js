const { verifySignUp } = require("../../middleware");
const controller = require("../../controllers/authentification/auth-customer.controller");
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
    "/api/auth/customer/signup",
    upload.array(),
    [
      verifySignUp.checkDuplicateUser,
    ],
    controller.signupCustomer
  );
 app.post(
    "/api/auth/customer/signin",
    upload.array(),
    controller.signinCustomer
    );
};