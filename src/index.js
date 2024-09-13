import express from 'express'
import { DB_URL, PORT } from './config/config.js'
import { connect } from 'mongoose'
import userRoutes from './routes/user.routes.js'

const app = express()

app.use(express.json())
app.use('/api/users', userRoutes)

connect(DB_URL)
  .then(() => {
    console.log('Conectado a la base de datos')
    app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))
  })
  .catch(e => console.log(e))