const express = require('express')  //nom i express
const app = express()
const port = 3000
const mongoose = require('mongoose')  //npm i mongoose  引入mongodb
mongoose.connect('mongodb://localhost:27017/express-test', { useNewUrlParser: true, useUnifiedTopology: true }) //27017默认端口  express-test数据库名，，没有的话会创建
const Product = mongoose.model('Product', new mongoose.Schema({   //创建Product表
  title: String
}))
// Product.insertMany([  //插入数据，只能运行一次，否则会重复插入
//   {title:'产品1'},
//   {title:'产品2'},
//   {title:'产品3'}
// ])
app.use(express.json())  //运行处理提交过来的json数据
app.use(require('cors')())//解决跨域问题：npm i cors
app.use('/', express.static('public'))
// app.get('/', (req, res) => res.send({ page: "Index" }))
app.get('/about', (req, res) => res.send({ page: "About us" }))

app.get('/products', async (req, res) => {
  // const data=await Product.find() //find()  查询Product表全部数据
  // const data=await Product.find().limit(2).skip(1)  //limit(2) 限制条数   skip跳过
  // const data = await Product.find().where({   //where条件查询
  //   title: '产品3'
  // })
  const data = await Product.find().sort({ _id: -1 })  //排序 1：正序  -1：倒叙
  res.send(data)
})

//根据id查询
app.get('/products/:id', async (req, res) => {
  const data = await Product.findById(req.params.id)
  res.send(data)
})


//新增数据
app.post('/products', async (req, res) => {
  const data = req.body
  const product = await Product.create(data)
  res.send(product)
})


//修改数据
app.put('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  product.title = req.body.title
  await product.save()
  res.send(product)
})


//删除数据
app.delete('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  await product.remove()
  res.send({
    success:true
  })
})


app.listen(port, () => console.log(`Example app listening on port port!`))