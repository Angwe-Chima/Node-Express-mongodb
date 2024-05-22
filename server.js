const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({path: './config.env'})

const app = require('./app')

mongoose.connect(process.env.CONN_STR, {
  useNewUrlParser: true
}).then((conn)=>{
  // console.log(conn);
  console.log("\nDataBase Connected ✔");
}).catch((err)=>{
  console.log("Error occured during connection", err);
})

const PORT = process.env.PORT || 500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
