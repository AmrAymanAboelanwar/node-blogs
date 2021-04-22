const Blog  = require('../model/blog');

const createBlog = ( newBlog )=> Blog.create(newBlog);
const editBlog = ( id , myBlog )=>Blog.findByIdAndUpdate(id,myBlog);


const getAll=_=>Blog.find().sort({createdAt:'desc'}).populate('author');
const deleteBlog =(id) => Blog.findByIdAndDelete(id);
const search=(name)=>Blog.find({$or:[{author:name.author},{title:name.title},{tags:name.tag}]});
const getByUserId=(id)=>Blog.find({author:id}).exec();
const getBlogById=(id)=>Blog.findById(id).populate('author').exec();



module.exports={
    createBlog,
    editBlog,
    getAll,
    deleteBlog,
    search,
    getByUserId,
    getBlogById
  }

