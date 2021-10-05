import Articles from "./Articles.js";
import FetchData from "./FetchData.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Pagination from "./Pagination.js";


const mainHeader = document.querySelector('header');
const mainFooter = document.querySelector('.main-footer');

let data = {
  response: {
    docs: []
  }
};
let copy = new Set();

let fetchData = new FetchData();
let dataFetched = await fetchData.init();

for(let i = 0; i < dataFetched.length; i++) {
  data.response.docs.push(...dataFetched[i].response.docs);
  copy.add(dataFetched[i].copyright);
}

let header = new Header({
  data
});
let articles = new Articles({
  data
});

let footer = new Footer({
  copy
})

mainHeader.insertAdjacentHTML('afterbegin', header.init());
mainFooter.insertAdjacentHTML('afterbegin', footer.init());
let pagination = new Pagination({ data: articles.articles } );
pagination.init();




