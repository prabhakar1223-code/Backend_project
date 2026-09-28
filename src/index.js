import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

console.log("DB_URL =", process.env.DB_URL);

import connectDB from "./db/index.js";

connectDB()
.then()
.catch((err)=>{
  
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

