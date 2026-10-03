import dotenv from "dotenv";
import {app} from "./app.js";
dotenv.config({ path: "./.env" });

console.log("DB_URL =", process.env.DB_URL);

import connectDB from "./db/index.js";

connectDB()
.then(()=>{
  app.listen(process.env.PORT ||8000,()=>{
    console.log(`Server is running on port: http://localhost:${process.env.PORT ||8000}`);
  })
})
.catch((err)=>{
  console.error("Error occurred while starting the server:", err);
})
// main()
// .then(()=>{
//   console.log("DB Connected Succesfully");
// })
// .catch((err)=>{
//   console.log(err);
// })
// async function main(){
//   mongoose.connect('');
// }

