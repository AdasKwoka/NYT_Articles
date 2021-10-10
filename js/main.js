import Articles from "./Articles.js";
import FetchData from "./FetchData.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Observer from "./Observer.js"
import Pagination from "./Pagination.js";

const observer = new Observer();
observer.subscribe({
  event: 'change currentPage',
  action: (currentPage) => {
    changeCurrentPage(currentPage);
  }
})

const mainHeader = document.querySelector('header');
const mainFooter = document.querySelector('footer');

let pagination = new Pagination(observer);
let serverClient = new FetchData();

async function changeCurrentPage(currentPage) {
  let dataFetched = await serverClient.fetchData(currentPage);

  let copy = dataFetched.copyright;
  let appData = dataFetched.response.docs;

  let header = new Header(appData, pagination.currentPage, pagination.numberOfPagesToPaginate, pagination.recordsPerPage);
  mainHeader.insertAdjacentHTML('afterbegin', header.render());

  let articles = new Articles(appData);
  articles.displayArticles();
  articles.addListenersToBtns();

  let footer = new Footer(copy);
  mainFooter.insertAdjacentHTML('afterbegin', footer.render());
  pagination.render();
}

changeCurrentPage();





