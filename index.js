require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()

//Multer configs
//const upload = multer({ dest: 'uploads/' })
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



//Middlewares
app.use(cors());
app.use('/public', express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
});


//Multer implementation
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  ///name, type and size.
  const data = {
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  }

  res.json(data)
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
