//app代表应用对象
module.exports = app => {
  //先得到mongoose的模块,通过它可以定义骨架模型和model
  let mongoose = app.mongoose;
  //先定义Schema ，通过它可以定义集合里文档的属性名和类型
  let Schema = mongoose.Schema;
  let CategorySchema = new Schema({
      name: String
  });
  return mongoose.model('Category', CategorySchema);
}
