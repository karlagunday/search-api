module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('property', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        street: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
        rent: DataTypes.INTEGER,
      },
      {
        freezeTableName: true,
      }
    );
  
    Property.associate = (models) => {
      Property.belongsTo(models.user);
    };

    Property.searchFields = [
        "street",
        "city",
        "state",
        "zip"
    ]
  
    return Property;
  }