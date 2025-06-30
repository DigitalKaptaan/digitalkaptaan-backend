import { User } from '../models'
import { comparePassword, signToken } from '../utils'

export const AuthService = {
  async login(email: string, password: string) {
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await comparePassword(password, user.password))) {
      throw { message: 'Invalid credentials', status: 401, code: 'Invalid_Credentials' }
    }

    const token = signToken({ id: user._id, role: user.role })
    return {
      token,
      user: { id: user._id, email: user.email, role: user.role }
    }
  },

  async register(email: string, password: string) {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw {
        message: 'Email is already registered',
        status: 409,
        code: 'EmailIsAlreadyRegistered'
      }
    }

    const newUser = new User({ email, password })
    await newUser.save()

    const token = signToken({ id: newUser._id, role: newUser.role })
    return {
      token,
      user: { id: newUser._id, email: newUser.email, role: newUser.role }
    }
  }
}
