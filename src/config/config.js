import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/'
