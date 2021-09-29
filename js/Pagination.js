class Pagination {
  constructor({ data }) {
    this.currentPage = 1;
    this.recordsPerPage = 10;
    this.data = data;
    this.btn_prev = document.querySelectorAll('.btn-prev');
    this.btn_next = document.querySelectorAll('.btn-next');
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
    let page_span = document.querySelectorAll('.nav-info');

    this.addListeners();
   
    if(page < 1) page = 1;
    if(page > this.numPages()) page = this.numPages();

    this.main.innerHTML = "";
    this.createContent(page);

    page_span.forEach(span => span.innerHTML = `${this.currentPage == 1 ? 1 : (this.currentPage - 1) * 10} - ${10 * this.currentPage} of ${this.data.length}`);

    this.checkVisibility(page);
  }

  addListeners() {
    this.btn_next.forEach(btn => btn.addEventListener('click', this.nextPage));
    this.btn_prev.forEach(btn => btn.addEventListener('click', this.prevPage));
  }

  checkVisibility(page) {
    page <= 1 ? this.btn_prev.forEach(btn => btn.style.visibility = "hidden") : this.btn_prev.forEach(btn => btn.style.visibility = "visible");
    page >= this.numPages() ? this.btn_next.forEach(btn => btn.style.visibility = "hidden") : this.btn_next.forEach(btn => btn.style.visibility = "visible");
  }

  createContent(page) {
    for(let i = (page - 1) * this.recordsPerPage; i < (page * this.recordsPerPage) && i < this.data.length; i++) {
      this.main.insertAdjacentHTML("beforeend", this.data[i])
    }
  }

  init() {
    this.changePage(1);
  }

  numPages() {
    return Math.ceil(this.data.length / this.recordsPerPage);
  }
}

export default Pagination;