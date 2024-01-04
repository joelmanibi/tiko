module.exports = (sequelize, Sequelize) => {
    const SubscriptionType = sequelize.define("subscriptionType", {
        subscriptionTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      subscriptionTypeName: {
        type: Sequelize.STRING,
      },
      subscriptionTypeAmount: {
        type: Sequelize.STRING,
      }
    });
      return SubscriptionType;
};