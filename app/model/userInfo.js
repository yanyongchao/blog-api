module.exports = app => {
  let mongoose = app.mongoose
  let Schema = mongoose.Schema
  const ObjectId = Schema.Types.ObjectId
  let UserInfoSchema = new Schema({
    uid: { type: ObjectId, ref: 'User' },
    username: { type: String, default: '' },
    company: { type: String, default: '' },
    age: { type: String, default: '' },
    city: { type: String, default: '' },
    email: { type: String, default: '' },
    wechat: { type: String, default: '' },
    avatar: String
  })
  return mongoose.model('UserInfo', UserInfoSchema)
}
