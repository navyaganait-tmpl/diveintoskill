const { DataTypes, BelongsTo } = require("sequelize");
const author = require('../models')
const category = require("./category");
module.exports = (sequelize, DataTypes) => {
    const blogs = sequelize.define("blogs", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            auto_increment: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        link: {
            type: DataTypes.TEXT,
            allowNull: false,
        },



    })
    // blogs.associate= function(models){

    // blogs.belongsTo(models.author,{
    //     targetkey:'authorId',
    //     // foreignKey:'id'

    // });
    // }
    blogs.associate = function (models) {
        models.blogs.belongsTo(models.category, { foreignKey: 'categoryId', as: 'blogCategory', });
        models.blogs.belongsTo(models.author, { foreignKey: "authorId" });

    };
    return blogs;
}

// export default blogs;