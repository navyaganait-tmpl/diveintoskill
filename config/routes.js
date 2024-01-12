const blogRouter=require("../routes/blogs");
module.exports=function(app){
console.log("test1");
app.use('/',blogRouter);
}