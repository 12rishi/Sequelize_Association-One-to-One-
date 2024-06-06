module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("contact", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temporaryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permanentAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Contact;
};
