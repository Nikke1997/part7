const Blog = require('../models/blog')
const User = require('../models/user')

const listWithMultiBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Testi1',
    author: 'Minä',
    url: 'http://www.testi.fi/',
    likes: 6
  },
  {
    title: 'testi2',
    author: 'Minä',
    url: 'http://www.testi2.fi/',
    likes: 7
  }
]

const usersBefore = [
  {
    username: 'testi2',
    name: 'testi2',
    password: 'testi2'
  }
]

const dummy = (blogs) => {
    return 1
  }

  //Returns the total number of likes for all blogs
  const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
  }


  //Returns the blog with the most likes
  const favoriteBlog = (blogs) => { 
    const reducer = (favorite, blog) => {
      return (favorite.likes > blog.likes) ? favorite : blog
    }
    return blogs.reduce(reducer, 0)
  }

  //Returns the author with the most blogs
  const mostBlogs = (blogs) => {
    const blogCounts = {}
  
    //Count the number of blogs for each author
    blogs.forEach((blog) => {
      if (blog.author in blogCounts) {
        blogCounts[blog.author] += 1
      } else {
        blogCounts[blog.author] = 1
      }
    })
  
    const mostBlogsAuthor = Object.keys(blogCounts).reduce((a, b) => (blogCounts[a] > blogCounts[b] ? a : b))
  
    return {
      author: mostBlogsAuthor,
      blogs: blogCounts[mostBlogsAuthor]
    }
  }

  //Returns the author with the most likes
  const mostLikes = (blogs) => {
    const blogLikes = {}
  
    blogs.forEach((blog) => {
      if (blog.author in blogLikes) {
        blogLikes[blog.author] += blog.likes
      } else {
        blogLikes[blog.author] = blog.likes
      }
    })
  
    const mostLikesAuthor = Object.keys(blogLikes).reduce((a, b) => (blogLikes[a] > blogLikes[b] ? a : b))
  
    return {
      author: mostLikesAuthor,
      likes: blogLikes[mostLikesAuthor]
    }}

    const blogsInDb = async () => {
      const blogs = await Blog.find({})
      return blogs.map(blog => blog.toJSON())
    }

    const usersInDb = async () => {
      const users = await User.find({})
      return users.map(u => u.toJSON())
    }


  

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    listWithMultiBlog,
    blogsInDb,
    usersInDb,
    usersBefore
  }
