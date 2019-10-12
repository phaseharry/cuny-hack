const app = require('./server/app')
const PORT = process.env.PORT || 5000

app.on('ready', () => {
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
})
