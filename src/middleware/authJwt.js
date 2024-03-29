const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "Aucun token fourni!"
      });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.userId;
      next();
    });
  };

  verifySudoToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "Aucun token fourni!"
      });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      User.findOne({
        where: {
          userId: decoded.userId,
          userRole: 1,
        }
      }).then(user => {
        if (!user) {
          return res.status(401).send({
            message: "Autorisation Super Admin Refusé"
          });
        }
        req.userId = decoded.userId;
        next();
      });
      
    });
  };

  

  

  const authJwt = {
    verifyToken: verifyToken,
    verifySudoToken: verifySudoToken,
  };
  module.exports = authJwt;