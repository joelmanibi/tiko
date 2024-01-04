module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
      paymentId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      IdPaymentType: {
        type: Sequelize.INTEGER
      },
      montantRecu: {
        type: Sequelize.INTEGER
      },
      retourCaise: {
        type: Sequelize.INTEGER
      },
      IdPaymentStatus: {
        type: Sequelize.INTEGER
      },
    }
      );
      return Payment;
};