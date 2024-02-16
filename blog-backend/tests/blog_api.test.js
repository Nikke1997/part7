const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("../utils/list_helper");
const usersBefore = require("../utils/list_helper").usersBefore;
const User = require("../models/user");

const api = supertest(app);

let token;

beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.listWithMultiBlog);
});

beforeAll(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.usersBefore);
});

beforeAll(async () => {
  const reqisteration = await api
    .post("/api/users")
    .send({ username: "testi", name: "testi", password: "testi" });
  const response = await api
    .post("/api/login")
    .send({ username: "testi", password: "testi" });
  token = await response.body.token;
});

describe("when there is initially some blogs saved", () => {
  //Check that the database returns JSON formated data.
  test("blogs are returned as json", async () => {
    const blogs = await helper.blogsInDb();
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  //Check that the database returns the correct number of blogs.
  test("blogs length", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.listWithMultiBlog.length);
  });

  //Check that the database returns id instead of _id.
  test("check id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });

  //Check that a new blog can be added.
  test("a valid blog can be added ", async () => {
    const newBlog = {
      title: "testi",
      author: "Minä",
      url: "http://www.testi.fi/",
      likes: 6,
    };
    const blogCreationResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
    expect(blogCreationResponse.status).toBe(201);

    const blogsAtEnd = await helper.blogsInDb();
    console.log("blogit lopussa", blogsAtEnd);
    expect(blogsAtEnd).toHaveLength(helper.listWithMultiBlog.length + 1);

  });

  //Check that a blog can be deleted.
  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    console.log("blogit deletessä", blogsAtStart);

    const blogToDelete = blogsAtStart[blogsAtStart.length - 1];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.listWithMultiBlog.length);
  });

  

//Check that a blog can be modified.
    test('a blog can be modified', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToModify = blogsAtStart[2]
      const newBlog = {
        title: 'testi',
        author: 'Minä',
        url: 'http://www.testi.fi/',
        likes: 6
      }
      await api.put(`/api/blogs/${blogToModify.id}`).send(newBlog).expect(200)
})


  
  //Check that a blog without likes will default to 0.
  test('if likes is missing, it will default to 0', async () => {
    const newBlog = {
      title: 'testi',
      author: 'testi2',
      url: 'http://www.testi.fi/',
    }
    await new Blog(newBlog).save()
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  //Check that a blog without title and url will return 400.
  
  test('if title and author is missing, return 400', async () => {
    const newBlog = {
      likes: 6,
      url: 'http://www.testi.fi/'
    }
    await api.post('/api/blogs').send(newBlog).set({Authorization: `Bearer ${token}` }).expect(400)
  }
  )
});

afterAll(async () => {
  await mongoose.connection.close();
});
