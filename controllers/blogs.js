// const Blog = require('../models/blog');
const Sequelize = require('sequelize');
const db = require('../database/models');
module.exports = {
  getAllBlogs: async (req, res) => {
    try {
      // const blogs = await blog.findAll();
      console.log(req.query);
      const page = parseInt(req.query.pageno)
      const pageSize = parseInt(req.query.pagesize)
      const offset = (page - 1) * pageSize;
      // console.log("test");
      const blogs = await db.blogs.findAll({
        include: [
          { model: db.author },
          {
            model: db.category,
            as: 'blogCategory',
            separate: false,
            attributes: ['category'],
          }],
        offset: offset,
        limit: pageSize
      })
      console.log(blogs);
      return res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getLimitedBlogs: async (req, res) => {
    try {

      const blogs = await db.blogs.findAll({
        include: [{ model: db.author },{
          model: db.category,
          as: 'blogCategory',
          separate: false,
          attributes: ['category'],
        }],
        limit: 4,
        order: [['createdAt', 'DESC']],
      });

      console.log(blogs, "HERE");
      return res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getBlogById: async (req, res) => {
    try {
      const blogId = req.params.id;

      const blog = await db.blogs.findByPk(blogId, {
        include: [{ model: db.author },{
          model: db.category,
          as: 'blogCategory',
          separate: false,
          attributes: ['category'],
        }],
      });

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      return res.status(200).json(blog);
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getRelatedBlogs: async (req, res) => {
    try {
      const blogId = req.params.id;
      const blog = await db.blogs.findByPk(blogId, {
        include: [{
          model: db.category,
          as: 'blogCategory',
          separate: false,

        }]
      });
      // const{dataValues}=blog.blogCategory.category;
      // console.log("scabhcvhdzv", blog.blogCategory.category);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      // const blogCategory = blog.category;
      // console.log(blog);

      // console.log("test");
      // Find 4 related blogs with similar category using ilike
      const relatedBlogs = await db.blogs.findAll({

        // id: {
        //   [Op.not]: id, // Exclude the current blog
        // },

        include: [{ model: db.author },{
          model: db.category,
          as: 'blogCategory',
          separate: false,

          where: {
            category: blog.blogCategory.category
          }
        }],

        limit: 4,
      });

      // console.log('Related Blogs:', relatedBlogs);

      return res.status(200).json(relatedBlogs);
    } catch (error) {
      console.error('Error fetching related blogs:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getSimilarBlogs: async (req, res) => {
    try {
      const searchTerm = req.params.searchTerm;

      // Find blogs where title or content is similar to the search term
      const similarBlogs = await db.blogs.findAll({
        include: [{ model: db.author },{
          model: db.category,
          as: 'blogCategory',
          separate: false,
          attributes: ['category'],
        }],
        where: {
          [db.Sequelize.Op.or]: [
            { title: { [db.Sequelize.Op.iLike]: `%${searchTerm}%` } },
            { description: { [db.Sequelize.Op.iLike]: `%${searchTerm}%` } },
          ],
        },
      });

      return res.status(200).json(similarBlogs);
    } catch (error) {
      console.error('Error fetching similar blogs:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

// module.exports =blogController;