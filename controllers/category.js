const Sequelize = require('sequelize');
const db = require('../database/models');

module.exports={
    getAllCategories:async (req, res) => {
        try {
          const categories = await db.category.findAll();
      
          const categoryNames = categories.map(category => category);
      
          return res.status(200).json(categoryNames);
        } catch (error) {
          console.error('Error fetching categories:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      },
      getBlogsByCategory: async (req, res) => {
        try {
          const categoryName = req.params.categoryName;
      
          
          const blogs = await db.blogs.findAll({
            include: [{ model: db.author },
              {
                model: db.category,
                as: 'blogCategory',
                where: {
                    category: categoryName,
                },
              },
            ],
          });
      
          return res.status(200).json(blogs);
        } catch (error) {
          console.error('Error fetching blogs by category:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      },
      
}