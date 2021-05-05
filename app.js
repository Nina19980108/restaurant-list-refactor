const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connectec!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// app.get('/restaurant/new', (req, res) => {
//   res.render('new')
// })

// app.post('/restaurant/new', (req, res) => {
//   const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
//   return restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
//     .then(() => res.redirect('/'))
//     .catch(error => console.error(error))
// })

// app.get('/restaurant/:id', (req, res) => {
//   const id = req.params.id
//   return restaurant.findById(id)
//     .lean()
//     .then(restaurant => res.render('detail', { restaurant }))
//     .catch(error => console.error(error))
// })

// app.get('/restaurant/:id/edit', (req, res) => {
//   const id = req.params.id
//   return restaurant.findById(id)
//     .lean()
//     .then(restaurant => res.render('edit', { restaurant }))
//     .catch(error => console.error(error))
// })

// app.put('/restaurant/:id', (req, res) => {
//   const id = req.params.id
//   return restaurant.findById(id)
//     .then(restaurant => {
//       restaurant = Object.assign(restaurant, req.body)
//       return restaurant.save()
//     })
//     .then(() => res.redirect('/'))
//     .catch(error => console.error(error))
// })

// app.delete('/restaurant/:id', (req, res) => {
//   const id = req.params.id
//   return restaurant.findById(id)
//     .then(restaurant => restaurant.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.error(error))
// })

app.listen(port, () => {
  console.log(`Restaurant list is on http://localhost:${port}`)
})