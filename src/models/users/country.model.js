module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("country", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      iso: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      nicename: {
        type: Sequelize.STRING,
      },
      iso3: {
        type: Sequelize.STRING,
      },
      phonecode: {
        type: Sequelize.INTEGER,
      },
    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return Country;
};