import express from "express";
import axios from "axios";
import path, {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const MIN_SCORE = 4;
const BANNED_GENRE = ["Hentai"];

const app = express();
const port = 3000;

const API_URL = "https://api.jikan.moe/v4/random/anime";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static( path.join(__dirname, "../public")));

var anime_data;
var error_message;

app.get("/", (req, res)=>{
   anime_data = null;
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
      if(anime_data.title === anime_data.title_english){
         anime_data.title_english = null;
         if(anime_data.title === anime_data.title_japanese){
            anime_data.title_japanese = null;
         }
      } else if(anime_data.title_english === anime_data.title_japanese){
         anime_data.title_japanese = null;
      }

      score = anime_data.score;
      if(!score){
         score = -1;
      }
      try{
         genre = anime_data.genres[0].name;
      }catch{
         genre = "";
      }

      if (score < MIN_SCORE || BANNED_GENRE.includes(genre)) {
         await new Promise(resolve => setTimeout(resolve, 335)); // delay because of rate limit of 3 per sec
      }
   } while(score < MIN_SCORE || BANNED_GENRE.includes(genre));

   res.render("index.ejs", {anime_data});
})

app.listen(port, ()=>{
   console.log(`Listening on port : ${port}`);
})