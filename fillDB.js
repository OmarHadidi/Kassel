const bcrypt = require('bcrypt');
const { User, Job, Blog } = require('./config').models;

async function fillDatabase() {
  try {
    // Create a user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await User.create({
      email: 'user@example.com',
      username: 'user123',
      password: hashedPassword
    });

    // Create two jobs
    const job1 = await Job.create({
      title: 'Software Engineer',
      description: 'Developing software applications'
    });

    const job2 = await Job.create({
      title: 'Data Analyst',
      description: 'Analyzing data to derive insights'
    });

    // Create three categories using the jobs
    const category1 = await job1.createCategory({ title: 'Technology' });
    const category2 = await job1.createCategory({ title: 'Engineering' });
    const category3 = await job2.createCategory({ title: 'Data Science' });

    // Create two blogs
    const blog1 = await Blog.create({
      title: 'Introduction to JavaScript',
      description: 'A beginner\'s guide to JavaScript',
      image: null,
      author_id: user.id
    });

    const blog2 = await Blog.create({
      title: 'Data Visualization Techniques',
      description: 'Exploring various data visualization methods',
      image: '/uploads/image-1707637163038.jpeg',
      author_id: user.id
    });

    // Create three details for each blog
    await blog1.createDetail({
      title: 'JavaScript Basics',
      description: 'Covering basic syntax and concepts of JavaScript',
      image: null
    });

    await blog1.createDetail({
      title: 'JavaScript Functions',
      description: 'Understanding functions in JavaScript',
      image: null
    });

    await blog1.createDetail({
      title: 'JavaScript DOM Manipulation',
      description: 'Manipulating the Document Object Model with JavaScript',
      image: null
    });

    await blog2.createDetail({
      title: 'Types of Charts',
      description: 'Exploring different types of charts used in data visualization',
      image: '/uploads/image-1707637163038.jpeg'
    });

    await blog2.createDetail({
      title: 'Data Cleaning Techniques',
      description: 'Methods for cleaning and preparing data for analysis',
      image: '/uploads/image-1707637163038.jpeg'
    });

    await blog2.createDetail({
      title: 'Interactive Data Visualizations',
      description: 'Creating interactive data visualizations using libraries like D3.js',
      image: '/uploads/image-1707637163038.jpeg'
    });

    // Create blog categories
    await blog1.createCategory({ title: 'Programming' });
    await blog2.createCategory({ title: 'Data Science' });
  } catch (error) {
    console.error('Error filling database:', error);
  }
}

module.exports = fillDatabase;
