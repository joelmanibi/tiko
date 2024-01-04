module.exports = (sequelize, Sequelize) => {
    const PaymentStatus = sequelize.define("paymentStatus", {
      paymentStatusId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      paymentStatusName: {
        type: Sequelize.STRING
      }
    }
      );
      return PaymentStatus;
};