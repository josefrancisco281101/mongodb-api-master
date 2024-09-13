import { Types } from 'mongoose'

export const validateID = (req, res, next) => { 
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'Debe proporcionar un ID' })
    
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID invalido' })
    
    next()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}