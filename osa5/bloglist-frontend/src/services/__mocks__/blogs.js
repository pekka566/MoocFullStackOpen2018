const blogs = [{
  id: "5a931ecac3327d2b418ef16d",
  title: "wtfugks",
  author: "Hezus Hoppz",
  url: "/api/blogs",
  user: {
    _id: "5a9308e80f8e571adf5683dd",
    username: "matti",
    name: "Matti Sipuli"
  }
}]

const getAll = () => {
  return Promise.resolve(blogs)
}

const create = (newBlog) => {
  return Promise.resolve('')
}

export default {
  getAll,
  create
}