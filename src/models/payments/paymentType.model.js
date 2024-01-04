module.exports = (sequelize, Sequelize) => {
    const PaymentType = sequelize.define("paymentType", {
      paymentTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      paymentTypeName: {
        type: Sequelize.STRING
      }
    }
      );
      return PaymentType;
};