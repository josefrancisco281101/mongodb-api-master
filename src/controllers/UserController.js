import User from '../models/User.js'
import bcrypt from 'bcrypt'

class UserController {
  static async index (req, res) {
    try {
      const users = await User.find().select('-password -__v')
      res.json(users)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getById (req, res) {
    try {
      const { id } = req.params
      const user = await User.findById(id)

      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

      res.json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async store (req, res) {
    try {
      const { fName, mName, lName, username, email, password } = req.body
      if (!fName || !lName || !username || !email || !password) return res.status(400).json({ message: 'Faltan datos' })

      const userEmail = await User.findOne({ email })
      if (userEmail) return res.status(400).json({ message: 'El correo ya está en uso' })

      const userUsername = await User.findOne({ username })
      if (userUsername) return res.status(400).json({ message: 'El nombre de usuario ya está en uso' })

      const hash = await bcrypt.hash(password, 10)
      const user = await User.create({
        fName,
        mName,
        lName,
        username,
        email,
        password: hash
      })

      res.status(201).json({ message: 'Usuario creado', data: user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async updatePatch(req, res) { 
    try {
      const { id } = req.params
      const { fName, mName, lName, username, email, password, image } = req.body

      const user = await User.findById(id)
      if (!user) return res.status(404).json({ message: 'No existe el usuario' })
      
      let newPassword = user.password
      if (password) {
        newPassword = await bcrypt.hash(password, 10)
      }
      
     const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          fName: fName || user.fName,
          mName: mName || user.mName,
          lName: lName || user.lName,
          username: username || user.username,
          email: email || user.email,
          password: newPassword,
          image: image || user.image,
        },
        },
        { new: true }
      ).select('-password -__v')

      if (!updatedUser) return res.status(404).json({ message: 'No se pudo actualizar el usuario' })

      res.json({ message: 'Usuario actualizado', data: updatedUser })

    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
   
  static async delete (req, res) {
    try {
      const { id } = req.params
      const userEliminado = await User.findByIdAndDelete(id)

      if (!userEliminado) return res.status(404).json({ message: 'No existe el usuario' })

      res.json({ message: 'Usuario eliminado', data: userEliminado })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
   
}

export default UserController