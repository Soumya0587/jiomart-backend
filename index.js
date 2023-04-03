const express = require("express")
const cors = require("cors");
const { connection } = require("./config/db");
const {GroceryRouter} = require("./routes/Grocery.routes")

// const fileupload = require("express-fileupload");
const { ClothingRouter } = require("./routes/clothing.routes");
const app = express()



app.use(cors({ origin: "*" }));
app.use(express.json());
require("dotenv").config();

app.get("/", (req, res) => {
    res.send("Home Page");
  });
  


app.use("/grocery", GroceryRouter);
app.use("/clothing", ClothingRouter);
// app.use(fileupload({
//   useTempFiles:true
// }))

app.listen(process.env.PORT,async ()=>{
    console.log(`server is running at ${process.env.PORT} `);
    await connection
    console.log("connected to db");
})