const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Route to get all blogs and populate each one with user detailts username and name.
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

//Route to get a single blog by id
blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

//Route to create a new blog and check if token is valid to make a post request
blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  console.log(body);

  const user = request.user;

  //Check if token is valid
  const token = request.token;
  if (!token || !user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  //Add blog to user's blogs array
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

//Route to delete a blog by id
blogsRouter.delete("/:id", async (request, response, next) => {
  //Check if token is valid
  const token = request.token;
  const user = request.user;

  if (!token || !user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  //Find blog based on id
  const blog = await Blog.findById(request.params.id);

  //Check if user is the creator of the blog
  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: "only the creator of the blog can delete it" });
  }

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

//Route to update a blog by id
blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);

  next(exception);
});

//Route to create a new comment
blogsRouter.post("/:id/comments", async (request, response, next) => {
  const body = request.body;
  const blog = await Blog.findById(request.params.id);
  blog.comments.push({ comment: body.comment });
  const updatedBlog = await blog.save();
  response.json(updatedBlog);
}
);

module.exports = blogsRouter;
