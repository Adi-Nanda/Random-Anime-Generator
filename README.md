# Random Anime Generator

### A simple Node.js web app that displays details of a random anime using the [Jikan API](https://jikan.moe/). Also proves direct link to the anime on [MyAnimeList](https://myanimelist.net/) link for it.

### 🔗[Live Demo](https://random-anime-generator-omega.vercel.app/)

## Installation & Usage
Requires [Node.js](https://nodejs.org/en)
1) Clone the repo
```bash
git clone https://github.com/Adi-Nanda/Random-Anime-Generator.git
```
2) Install dependencies
```bash
npm install
```
3) Run the server
```bash
node "api/index.js"
```

## Additional Notes
Anime with score lower than 4 or containing "Hentai" genre is rejected and a new request is made after 335ms because of rate limit of 3 requests per second.

<br>
Can be changed by modifying the variables.

```bash
const MIN_SCORE = 4;
const BANNED_GENRE = ["Hentai"];
```