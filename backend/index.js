const express = require('express')
require('dotenv').config();
const connectToMongo = require('./db') ;

connectToMongo() ;

const app = express()
const port = 6000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.get('/', (req, res) => {
    res.send('Application running successfully !')
  })

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
