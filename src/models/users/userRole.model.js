module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("userRole", {
      userRoleId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userRoleName: {
        type: Sequelize.STRING,
      },
    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return UserRole;
};