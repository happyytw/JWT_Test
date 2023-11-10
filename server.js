
const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')

app.use(express.json()) // body parser to parse JSON

const users = [
  {username: 'taewon', password: 'password123'}
]

const accounts = [
  {name: 'taewon', balance: 5000}, 
  {name: 'taewon', balance: 2500}
]


function authenticate(req, res, next) {
    
  const headers = req.headers['authorization']
  console.log(headers)
  if(headers) {
    // Bearer oabsdoabsoidabsiodabsiodbasoid
    const token = headers.split(' ')[1]
    const decoded = jwt.verify(token, 'SECRET')
    
    if(decoded) { // 유효한 token이라면
      const username = decoded.username 
      const persistedUser = users.find(user => user.username == username.toLowerCase()) 
      if(persistedUser) { // 존재하는 유져라면
        next()
      } else { // 존재하지 않는 유저라면
        res.json({message: 'Unauthorized access'})
      }
    } else { // 유효하지 않은 token이라면
      res.json({message: 'Unauthorized access'})
    }
    
  } else {
    res.json({message: 'Unauthorized access'})
  }
  
}


app.get('/accounts', authenticate, (req, res) => {
  res.json(accounts)
})

app.post('/login', (req, res) => {
  
  const username = req.body.username 
  const password = req.body.password 
  
  const authUser = users.find(user => user.username.toLowerCase() == username.toLowerCase() && user.password == password)
  
  if(authUser) {
    // generate a token 
    const token = jwt.sign({username: username}, "SECRET")
    if(token) {
      res.json({token: token})
    } else {
      res.json({message: "Authentication Failed", success: false})
    }
  } else {
     res.json({message: "Authentication Failed", success: false})
  }
  
})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
