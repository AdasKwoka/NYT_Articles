import Articles from "./Articles.js";
import FetchData from "./FetchData.js";

const main = document.querySelector("main");


let fetchData = new FetchData();
let data = await fetchData.init();


let articles = new Articles({
  data
});

console.log(articles.articles);

articles.articles.forEach(newArticle => {

  main.insertAdjacentHTML('afterbegin', newArticle);
})

