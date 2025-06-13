import express from "express";
import axios from "axios";
// import path, {dirname} from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const API_URL = "https://api.jikan.moe/v4/random/anime";

// app.use(express.static( path.join(__dirname, "public")));
app.use(express.static("./public"));

var anime_data;
var error_message;

app.get("/", (req, res)=>{
   res.render("index.ejs", {anime_data , error_message});
});

app.get("/random",async (req, res)=>{
   var score;
   var genre;
   do{
      var response;
      try{
         response = await axios.get(API_URL);
         if(response.status !== 200){
            throw new Error("Internal server error<br/>Please try again later");
         }
      }catch(error){
         console.log(error);
         error_message = error.message;
         res.redirect("/");
         return;
      }
      
      anime_data = response.data.data;
      score = anime_data.score;
      if(!score){
         score = -1;
      }
      try{
         genre = anime_data.genres[0].name;
      }catch{
         genre = "";
      }

      if (score < 4 || genre === "Hentai") {
         await new Promise(resolve => setTimeout(resolve, 335));
      }
   } while(score < 4 || genre === "Hentai");

   res.redirect("/");
})

app.listen(port, ()=>{
   console.log(`Listening on port : ${port}`);
})