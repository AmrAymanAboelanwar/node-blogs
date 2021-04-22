const express = require('express');
const app =express();
var cors = require('cors')
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/auth');
const url ="mongodb+srv://AmrAymanAboelanwar:mnia@1997@cluster0.ibiwz.mongodb.net/BlogsNode?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect('mongodb://localhost:27017/Blog',{useNewUrlParser: true, useUnifiedTopology: true});
const blogRouter = require('./routers/blog');
const userRouter = require('./routers/user');
const commentRouter = require('./routers/comment');
const router = express.Router();
app.use(cors());
app.use(express.json());

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods: PUT,GET,POST,DELETE,PATCH");
   res.header("Access-Control-Allow-Origin: *");
   res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.use('/user',userRouter)
app.use('/blog',blogRouter)
app.use('/comment',authMiddleware,commentRouter)
//hello

app.use((err, req, res, next) => {
    res.status(503).json({"error":err.message});
  });

app.use((req, res, next) => {
    res.status(404).json({ err: 'page not found' });
 });

app.listen(9000,()=>{
    console.log('App is ready on: ' , 9000);
 
})