const express = require('express');
const cors = require('cors');
const db = require('./config/databse.js');
const cookieParser = require('cookie-parser');
const {Users} = require('./src/models/index.js');
const multer = require('multer');
const path = require('path')
const fileImage = require('./src/storageImage/index.js');
// Controllers
const userRoute = require('./src/routes/user.js');
const loginRoute = require('./src/routes/login.js');
const dashboardRoute = require('./src/routes/dashboard.js');
const chapterRoute = require('./src/routes/chapter.js');
const myBooksRoute = require('./src/routes/mybooks.js');
const refreshTokenRoute = require('./src/routes/refreshToken.js')
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,           
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'image')
  },
  filename: (req,file,cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname)
  }
});

const filterFile = (req, file, cb) => {
  if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
    cb(null, true);
  }else {
    cb(null, false)
  }
}





try {
	db.authenticate();
}catch (error){
	console.log("Terjadi error > ", error)
}

app.use('/image', express.static(path.join(__dirname, 'image')))
app.use(multer({storage:fileStorage, filterFile:filterFile}).single('image'));


app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());

var whitelist = ['http://localhost:5000', 'http://localhost:300'/** other domains if any */ ]

app.use(cookieParser())

// Error handle
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.dataDirs
  res.status(status).json({message,data});
});

// Handle image

// Route Handle

app.use('/', userRoute);
app.use('/', loginRoute);
app.use('/', refreshTokenRoute);
app.use('/', dashboardRoute);
app.use('/', chapterRoute);
app.use('/', myBooksRoute)
app.listen(5000, () => console.log("Server RUn"))
