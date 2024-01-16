const {DataTypes, BelongsTo}= require("sequelize");
const author=require('./author');
module.exports=(sequelize,DataTypes)=>{
    const category =sequelize.define("category",{
        categoryId:{
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
    category.associate = function (models) {
        models.category.hasMany(models.blogs, { foreignKey: "categoryId" ,as: 'blogCategory',});
      };
    return category;
}