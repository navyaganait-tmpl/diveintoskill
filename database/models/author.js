const {DataTypes, BelongsTo}= require("sequelize");
module.exports=(sequelize,DataTypes)=>{
    const author =sequelize.define("author",{
        authorId:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            auto_increment:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        photo:{
            type:DataTypes.TEXT,
            allowNull: true,
        }
    })
    author.associate = function (models) {
        models.author.hasMany(models.blogs, { foreignKey: "authorId" });
      };
    return author;

}