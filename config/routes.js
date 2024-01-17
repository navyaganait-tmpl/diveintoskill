const blogRouter=require("../routes/blogs");
const categoryRouter=require("../routes/category");
const contactRouter=require("../routes/contact");
const subscribeRouter=require("../routes/subscribe");
module.exports=function(app){
app.use('/',blogRouter);
app.use('/',categoryRouter);
app.use('/',contactRouter);
app.use('/',subscribeRouter);
}