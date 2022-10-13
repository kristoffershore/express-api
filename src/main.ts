import express from "express";
import bodyParser from "body-parser";
import { userRouter } from "./router/userRouter";
import path from "path";

const port = 3000;
const app = express();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}))

//app.set("view engine", "ejs")

app.use('/Users', userRouter);




app.get("/", (req: any,res: any, next) =>{
    console.log("Gettin' stuff")
    //res.render("index")
    res.sendFile(path.join(__dirname, "../src/public/index.html"));
  })

app.all('*', (req, res) => {
  res.redirect("/");
});


app.listen(port, () => { 
    console.log("Server started on port 3000 🚀")
  })
