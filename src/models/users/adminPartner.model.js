module.exports = (sequelize, Sequelize) => {
    const AdminPartner = sequelize.define("adminPartner", {
        adminPartnerId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      idUser: {
        type: Sequelize.INTEGER
      },
      idPartner: {
        type: Sequelize.INTEGER
      },
      partnerLogin : {
        type:Sequelize.STRING
      }
    }
      );
      return AdminPartner;
};