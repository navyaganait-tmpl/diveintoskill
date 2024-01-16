module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
      name: {type:DataTypes.STRING,
        allowNull: true,
    },
      email: {type:DataTypes.STRING,
        allowNull: true,},
      headline:{type:DataTypes.TEXT,
        allowNull: true,},
      details: {type:DataTypes.TEXT,
        allowNull: true,},
      isSubscribed:{type:DataTypes.BOOLEAN,
        allowNull: true,}
    });
  
    return Contact;
  };