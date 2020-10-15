import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface User extends mongoose.Document{
  username: string
  password: string
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    set(val: string) {
      return bcrypt.hashSync(val, 10)
    }
  }
})
const UserModel = mongoose.model<User>('User', UserSchema)
// UserModel.create({username: 'Flinn Kuang', password: 'it980515'})
export default UserModel