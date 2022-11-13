const express = require('express')
var cors = require('cors')
require('dotenv').config();
const connectToMongo = require('./db') ;

connectToMongo() ;

const app = express()
const port = 7789

app.listen(port, () => {
  console.log(`INotebook app listening on port ${port}`)
})

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.get('/', (req, res) => {
    res.send('Application running successfully !')
  })

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
