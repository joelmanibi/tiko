module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userFirstname: {
        type: Sequelize.STRING
      },
      userLastname: {
        type: Sequelize.STRING
      },
      userPhone: {
        type: Sequelize.STRING
      },
      userCountry: {
        type: Sequelize.INTEGER
      },
      IdUserRole: {
        type: Sequelize.INTEGER
      },
      userPassword: {
        type: Sequelize.STRING
      },
      userToken: {
        type: Sequelize.STRING
      },
      userIsActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      userIsValide: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    }
      );
      return User;
};