const db = require("../../models");
const config = require("../../../config/auth.config");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signupCustomer = (req, res) => {
  // Save User to Database
  User.create({
    userFirstname: req.body.userFirstname,
    userLastname: req.body.userLastname,
    userPhone: req.body.userPhone,
    IdUserRole: 37,
    userIsActive: 1,
    userPassword: bcrypt.hashSync(req.body.userPassword, 8),
    userCountry :req.body.userCountry
  })
    .then(user => {
      var token = jwt.sign({ userId: user.userId }, config.secret, {
        expiresIn: 60480000 // 23 mois
      });
      User.update(
        {
          userToken: token,
        },
        {
          where: { userId: user.userId },
        }
      );
      res.status(200).json({
        userId: user.userId,
        userFirstname: req.body.userFirstname,
        userLastname: req.body.userLastname,
        userPhone: user.userPhone,
        userToken: token,
        statutcode: 1
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signinCustomer = (req, res) => {
  User.findOne({
    where: {
      userPhone: req.body.userPhone,
      userCountry :req.body.userCountry,
      userIsActive: 1,
     // user_role:4

    }
  }).then(user => {
      if (!user) {
        return res.status(404).json({ message: "Aucun utilisateur trouver ou desactivé", statutcode: 0 });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.userPassword,
        user.userPassword
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          message: "Mot de passe invalide",
          statutcode: 0
        });
      }
      var token = jwt.sign({ userId: user.userId }, config.secret, {
        expiresIn: 60480000 // 23 mois
      });

      User.update(
        {
          userToken: token,
        },
        {
          where: { userId: user.userId },
        }
      );
        //console.log(token)
      res.status(200).json({
        userId: user.userId,
        userFirstname: req.body.userFirstname,
        userLastname: req.body.userLastname,
        userPhone: user.userPhone,
        userToken: token,
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