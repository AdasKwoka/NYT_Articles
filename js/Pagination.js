import ShowMore from "./ShowMore.js";

class Pagination {
  constructor({ data }) {
    this.currentPage = 1;
    this.recordsPerPage = 10;
    this.data = data;
    this.main = document.querySelector('main');
  }

  prevPage = ()  => {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.changePage(this.currentPage);
    }
  }

  nextPage = () => {
    if(this.currentPage < this.numPages()) {
      this.currentPage++;
      this.changePage(this.currentPage);
    }
  }

  changePage(page) {
    if(page < 1) page = 1;
    if(page > this.numPages()) page = this.numPages();

    this.main.innerHTML = `
    <h1 class="header-main-articles">Articles</h1>
    <div class="nav-pagination">
      <button class="btn-prev">&lt;</button>
      <span class="nav-info"></span>
      <button class="btn-next">&gt;</button>
    </div>
    `;

    let btn_prev = document.querySelectorAll('.btn-prev');
    let btn_next = document.querySelectorAll('.btn-next');
    this.addListeners(btn_prev, btn_next);

    this.createContent(page);

    ShowMore.addListenersToBtns();

    this.checkVisibility(page);
  }

  addListeners(btn_prev, btn_next) {
    btn_next.forEach(btn => btn.addEventListener('click', this.nextPage));
    btn_prev.forEach(btn => btn.addEventListener('click', this.prevPage));
  }

  checkVisibility(page) {
    page <= 1 ? this.btn_prev.forEach(btn => btn.style.visibility = "hidden") : this.btn_prev.forEach(btn => btn.style.visibility = "visible");
    page >= this.numPages() ? this.btn_next.forEach(btn => btn.style.visibility = "hidden") : this.btn_next.forEach(btn => btn.style.visibility = "visible");
  }

  createContent(page) {
    let page_span = document.querySelectorAll('.nav-info');
    let header_article = document.querySelector('.header-main-articles');

    for(let i = (page - 1) * this.recordsPerPage; i < (page * this.recordsPerPage) && i < this.data.length; i++) {
      header_article.insertAdjacentHTML("afterend", this.data[i])
    }
    
    page_span.forEach(span => span.innerHTML = `${this.currentPage == 1 ? 1 : (this.currentPage - 1) * 10} - ${10 * this.currentPage} of ${this.data.length}`);
  }

  init() {
    this.changePage(1);
  }

  numPages() {
    return Math.ceil(this.data.length / this.recordsPerPage);
  }
}

export default Pagination;