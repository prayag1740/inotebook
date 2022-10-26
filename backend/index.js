const express = require('express')
const connectToMongo = require('./db') ;

connectToMongo() ;

const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Application running successfully !')
  })

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
