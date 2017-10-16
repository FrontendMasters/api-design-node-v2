import mongoose from 'mongoose'

export const schema = {
  
}

const userSchema = new mongoose.Schema(schema, {timestamps: true})

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
