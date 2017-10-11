import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    required: true,
    type: String,
  }
}, {timestamps: true})

userSchema.methods = {
  authenticate(plaintTextPassword) {
    return bcrypt.compareSync(plainTextPword, this.password)
  },
  hashPassword(plaintTextPassword) {
    if (!plaintTextPassword) {
      throw new Error('Could not save user')
    }

    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(plaintTextPassword, salt)
  }
}

export const User = mongoose.model('user', userSchema)
