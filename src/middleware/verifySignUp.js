const db = require("../models");
const User = db.user;
const Partner = db.partner;
var multer = require('multer');
var upload = multer();

checkDuplicateUser = (req, res, next) => {
  // User number
  User.findOne({
    where: {
      userPhone: req.body.userPhone,
      userCountry: req.body.userCountry
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Échec ! Le numéro de téléphone est déjà utilisé !"
      });
      return;
    }
    next();
  });
};


checkDuplicatePartner = (req, res, next) => {
  // User number
  Partner.findOne({
    where: {
      partnerSigle: req.body.partnerSigle
    }
  }).then(partner => {
    if (partner) {
      res.status(400).send({
        message: "Échec ! Ce Sigle est déjà utilisé !"
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
    checkDuplicateUser: checkDuplicateUser,
    checkDuplicatePartner: checkDuplicatePartner,
  };
  module.exports = verifySignUp;