const {DataTypes, BelongsTo}= require("sequelize");
const author=require('./author');
module.exports=(sequelize,DataTypes)=>{
    const category =sequelize.define("category",{
        id:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            auto_increment:true
        },
        category:{
            type:DataTypes.STRING,
            allowNull: false,
        }
    })
    // category.associate= function(models){
    //     category.hasMany(models.blog,{
    //         as :'categoryId'
    //     });}
    author.associate = function (models) {
        models.author.belongsTo(models.blogs, { foreignKey: "id" });
      };
    return category;
}