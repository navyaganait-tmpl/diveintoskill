// const Blog = require('../models/blog');
const { Sequelize, Op } = require('sequelize');
const db =require('../database/models');
module.exports = {
  getAllBlogs: async (req, res) => {
    try {
      // const blogs = await blog.findAll();
      console.log(req.query);
      const page = parseInt(req.query.pageno) 
      const pageSize = parseInt(req.query.pagesize) 
      const offset = (page - 1) * pageSize;
      // console.log("test");
      const blogs = await db.blogs.findAll({offset:offset,limit:pageSize,})
      return res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getLimitedBlogs: async (req, res) => {
    try {
      
      const blogs = await db.blogs.findAll({
        limit: 4,
        order: [['createdAt', 'DESC']], 
      });

      return res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getBlogById: async (req, res) => {
    try {
      const blogId = req.params.id;

      const blog = await db.blogs.findByPk(blogId);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      return res.status(200).json(blog);
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getRelatedBlogs : async (req, res) => {
    try {
      const blogId = req.params.id;
      const blog = await db.blogs.findByPk(blogId);
  
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      console.log("test");
      // Find 4 related blogs with similar category using ilike
      const relatedBlogs = await db.blogs.findAll({
        where: {
          category: {
            [Op.iLike]: `%${blog.category}%`, 
          },
          // id: {
          //   [Op.not]: id, // Exclude the current blog
          // },
        },
        limit: 4,
      });

      console.log('Related Blogs:', relatedBlogs);
  
      return res.status(200).json(relatedBlogs);
    } catch (error) {
      console.error('Error fetching related blogs:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
};

// module.exports =blogController;