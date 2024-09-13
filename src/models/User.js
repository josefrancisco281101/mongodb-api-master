import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  fName: {
    type: String,
    required: true
  },
  mName: {
    type: String,
    required: false
  },
  lName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
})

const User = model('User', userSchema)

export default User