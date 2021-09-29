import Articles from "./Articles.js";
import FetchData from "./FetchData.js";
import Header from "./Header.js";
import Pagination from "./Pagination.js";

const mainHeader = document.querySelector('.main-header')

let data = {
  response: {
    docs: []
  }
};
let fetchData = new FetchData();
let dataFetched = await fetchData.init();

for(let i = 0; i < dataFetched.length; i++) {
  data.response.docs.push(...dataFetched[i].response.docs)
}

let header = new Header({
  data
});
let articles = new Articles({
  data
});

mainHeader.insertAdjacentHTML('afterbegin', header.init());
let pagination = new Pagination({ data: articles.articles } );
pagination.init();


