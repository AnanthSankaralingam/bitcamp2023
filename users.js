const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const LogInCollection = require("./src/mongodb")
const port = process.env.PORT || 3001
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../workspace/src/templates')
const publicPath = path.join(__dirname, '../workspace/src/publics')
console.log(publicPath);
console.log(tempelatePath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})


app.post('/signup', async (req, res) => {

    const data = {
        name: req.body.name,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        birth_year: req.body.birth_year,
        allergies: req.body.allergies,
        medications: req.body.medications
    }
    const checking = await LogInCollection.findOne({ name: req.body.name })

   try{
      if (checking && checking.name === req.body.name && checking.password===req.body.password) {
            res.send("user details already exists")
      }
      else{
            await LogInCollection.insertMany(data)
      }
   }
   catch(e){
    console.error(e);
   }

     res.status(201).render("home", {
         naming: req.body.name
     })
  

})
app.post('/signup', async (req, res) => {

  const data = {
      name: req.body.name,
      password: req.body.password
  }

  const checking = await LogInCollection.findOne({ name: req.body.name })

 try{
    if (checking.name === req.body.name && checking.password===req.body.password) {
          res.send("user details already exists")
    }
    else{
          await LogInCollection.insertMany(data)
          //res.send("http://localhost:3000");
          res.status(201).render("home", {
              naming: req.body.name
          })
    }
 }
 catch(e){
  res.send("Caught error")
 }

})



app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {
        res.send("wrong details")
    }


})

app.listen(port, () => {
    console.log('port connected');
})