// 載入框架Express
const express = require('express')
const app = express()
// 載入套件express-handlebars
const exphbs = require('express-handlebars')
// 載入餐廳資料
const restaurantList = require('./restaurant.json').results
// 通訊埠數
const port = 3000



// 設置樣版引擎
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


// 設置靜態檔案
app.use(express.static('public'))



// 設定路由
// 首頁
app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurantList})
})

// 餐廳詳細資訊
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', {restaurant})
})

// 搜尋結果
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.filter(restaurant => {
    const texts = [restaurant.name, restaurant.category]
    return texts.some(text => text.toLowerCase().includes(keyword.toLowerCase()))
  })
  res.render('index', {restaurants, keyword})
})


// 啟用並監聽伺服器
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})