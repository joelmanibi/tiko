module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define( "city", {
        cityId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          cityName: {
            type: Sequelize.STRING
          },
    }
    );
    return City
}