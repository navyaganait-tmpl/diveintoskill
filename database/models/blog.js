const {DataTypes, BelongsTo}= require("sequelize");
const author=require('../models')
const category = require("./category");
module.exports=(sequelize,DataTypes)=>{
    const blogs =sequelize.define("blogs",{
        id:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            auto_increment:true
        },
        title:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        link:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        

    })
    // blogs.associate= function(models){
        blogs.associate = function (models) {
            models.blogs.belongsTo(models.author, { foreignKey: "id" });
          };
        // blogs.belongsTo(models.author,{
        //     targetkey:'authorId',
        //     // foreignKey:'id'
            
        // });
    // }
    blogs.associate = function (models) {
        models.blogs.hasMany(models.category, { foreignKey: "id" });
      };
    return blogs;
}

// export default blogs;