const db = require("../../models");
const config = require("../../../config/auth.config");
const MyConfig = require("../conf/random")
const User = db.user;
const Partner = db.partner;
const AdminPartner = db.adminPartner
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const uploadLogo = require("../../../helpers/partner/logo/uploadPartnerLogo");
const util = require("util");
const { verifySignUp } = require("../../middleware")

exports.signupPartnerAdmin = async (req, res) => {
  
  var code = MyConfig.randomCodeGenerator();
  var codeNUMBER = MyConfig.randomCodeNumber();
  

  const uploadFile = util.promisify(uploadLogo.single('logo_file'));
    try {
        await uploadFile(req, res);
        var loginPatner = req.body.partnerSigle + codeNUMBER + code
        verifySignUp.checkDuplicateUser;
        verifySignUp.checkDuplicatePartner;
  Partner.create({
    partnerName: req.body.partnerName,
    partnerSigle: req.body.partnerSigle,
    partnerLogo: req.file.filename
    
  })
    .then(partner => {
      User.create({
        userFirstname: req.body.userFirstname,
        userLastname: req.body.userLastname,
        userPhone: req.body.userPhone,
        IdUserRole: 17,
        userIsActive: 0,
        userIsValide: 0,
        userPassword: bcrypt.hashSync(req.body.userPassword, 8),
        userCountry :req.body.userCountry 
      })
        .then(user => {
          
          AdminPartner.create(
            {
              partnerPartnerId: partner.partnerId,
              userUserId: user.userId,
              partnerLogin: loginPatner
            }
          );
         
          res.status(200).json({
            message: "Vous etes bien enregistré avec me login: "+loginPatner + "en attente de validation coté BO",
            statutcode: 1
          });
          
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

  } catch (error) {
    console.log(error)
}
};

exports.signinPartner = (req, res) => {
  AdminPartner.findOne({
    where: {
      partnerLogin: req.body.partnerLogin

    },
    include: [
      {
        model:User
      },
      {
        model:Partner
      }
    ]
  }).then(adminpartner => {
    if (!adminpartner) {
      return res.status(404).json({ message: "Aucun utilisateur trouver ou desactivé", statutcode: 0 });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.userPassword,
      adminpartner.user.userPassword
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Mot de passe invalide",
        statutcode: 0
      });
    }

    res.status(200).json({
      adminPartnerId: adminpartner.adminPartnerId,
      userFirstname: adminpartner.user.userFirstname,
      userLastname: adminpartner.user.userLastname,
      userPhone: adminpartner.user.userPhone,
      userToken: adminpartner.user.userToken,
      statutcode: 1
    });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
        statutcode: 0
       });

    });
};