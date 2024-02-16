const listHelper = require('../utils/list_helper')
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes
const Blog = require('../models/blog')
const listWithMultiBlog = require('../utils/list_helper').listWithMultiBlog

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {
  
    test('when list has only one blog equals the likes of that', () => {
      const result = totalLikes(listWithMultiBlog)
      expect(result).toBe(18)
    })

  })

  describe('fav blog', () => {
    test('favorite blog', () => {
        const result = favoriteBlog(listWithMultiBlog)
        expect(result).toEqual(listWithMultiBlog[2])
    })
  })

  describe('most blogs', () => {
    test('most blogs', () => {
        const result = mostBlogs(listWithMultiBlog)
        expect(result).toEqual({ author: 'Minä', blogs: 2})
    })
})

describe('most likes', () => {
    test('most likes', () => {
        const result = mostLikes(listWithMultiBlog)
        expect(result).toEqual({ author: 'Minä', likes: 13})
    })
})