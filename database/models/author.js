const {DataTypes, BelongsTo}= require("sequelize");
module.exports=(sequelize,DataTypes)=>{
    const author =sequelize.define("author",{
        id:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            auto_increment:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        photo:{
            type:DataTypes.STRING,
            allowNull: true,
        }
    })
    author.associate = function (models) {
        models.author.belongsTo(models.blogs, { foreignKey: "id" });
      };
    return author;

}