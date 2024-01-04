module.exports = (sequelize, Sequelize) => {
    const Partner = sequelize.define("partner", {
        partnerId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      partnerName: {
        type: Sequelize.STRING
      },
      partnerSigle: {
        type: Sequelize.STRING
      },
      partnerLogo: {
        type: Sequelize.STRING
      }
    }
      );
      return Partner;
};