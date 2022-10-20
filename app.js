const express = require('express');
const mongoose= require('mongoose');
const path = require('path');
const Product = require('./models/product');
const Bill = require('./models/bill');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');


mongoose.connect('mongodb://localhost:27017/mastermart', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/register',async(req,res)=>{
    res.render('users/register')
})

app.post('/register',async(req,res)=>{
   res.redirect('/')
})

app.get('/login',async(req,res)=>{
    res.render('users/login')
})

app.get('/products',async(req,res)=>{
   const products = await Product.find();
   res.render('products/inventory',{products});
})

app.get('/new',async(req,res)=>{
    res.render('products/new');
})

app.get('/products/:id',async(req,res)=>{
    const id= req.params.id;
    const product = await Product.findById(id);
    res.render('products/show',{product});
})

app.post('/products',async(req,res)=>{
const product = new Product(req.body.product);
await product.save();
res.redirect('/products')
})

app.get('/products/:id/edit',async(req,res)=>{
    const {id}=req.params
    const product = await Product.findById(id);
res.render('products/edit',{product})
})

app.put('/products/:id',async(req,res)=>{
const {id}=req.params;
const product = await Product.findByIdAndUpdate(id,{...req.body.product});
res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id',async(req,res)=>{
    const {id}= req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

// bills
app.get('/bills',async(req,res)=>{
    
        const bills = await Bill.find();
        res.render('bills/bills',{bills});
    
    
})

app.get('/bills/new',async(req,res)=>{

    res.render('bills/new');
})

app.post('/bills',async(req,res)=>{

    const bill = new Bill(req.body.bill);
    console.log(req.body.bill)
    await bill.save();
    res.redirect('/bills')
    })

app.get('/',(req,res)=>{
res.render('products/home');
})

app.listen(3000,()=>{
    console.log('serving on port 3000');
})
