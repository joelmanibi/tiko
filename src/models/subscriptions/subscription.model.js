module.exports = (sequelize, Sequelize) => {
    const Subscription = sequelize.define("subscription", {
        subscriptionId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      subscriptionCode: {
        type: Sequelize.STRING,
      },
      IdSubscriptionType: {
        type: Sequelize.INTEGER,
      },
      subscriber: {
        type: Sequelize.INTEGER,
      }
    });
      return Subscription;
};