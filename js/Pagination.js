import ShowMore from "./ShowMore.js";

class Pagination {
  constructor({ data }) {
    this.currentPage = 1;
    this.recordsPerPage = 10;
    this.numberOfPages = 3;
    this.data = data;
    this.main = document.querySelector('main');
  }

  displayList() {
    this.main.innerHTML = `
    <h1 class="header-main-articles">Articles</h1>
    <div class="pagination-element">
    <button class="btn-prev">&lt;</button>
    <button class="btn-next">&gt;</button>
    </div>
    `

    let headerOfArticles = document.querySelector('.header-main-articles');
    this.currentPage--;

    let start = this.recordsPerPage * this.currentPage;
    let end = start + this.recordsPerPage;
    let paginatedItems = this.data.slice(start, end);

    this.currentPage++;

    for(let i = 0; i < paginatedItems.length; i++) {
      headerOfArticles.insertAdjacentHTML("afterend", paginatedItems[i])
    }
  }

  displayCurrentNumberOfPages() {
    let page_span = document.querySelector('.nav-info');

    page_span.innerHTML = `${this.currentPage == 1 ? 1 : (this.currentPage - 1) * 10} - ${10 * this.currentPage} of ${this.data.length}`;
  }

  paginationNumbers() {
    let paginationElement = document.querySelector('.btn-next');
    let page_count = this.numPages();

    if(page_count <= this.numberOfPages){
      for(let i = 1; i <= page_count; i++) {
        let btn = `<button class='pag-numb ${i == this.currentPage ? ' active' : ''}' data-number="${i}">${i}</button>`;
        paginationElement.insertAdjacentHTML('beforebegin', btn);
      }
    } else {
      if(this.currentPage < this.numberOfPages) {
        for(let i = 1; i <= this.numberOfPages; i++) {
          let btn = `<button class='pag-numb ${i == this.currentPage ? ' active' : ''}' data-number="${i}">${i}</button>`;
  
          paginationElement.insertAdjacentHTML('beforebegin', btn);
        }
        let dots = `<span class='dots'>...</span>`
        paginationElement.insertAdjacentHTML('beforebegin', dots)
        let btn = `<button class='pag-numb' data-number="${this.numPages()}">${this.numPages()}</button>`
        paginationElement.insertAdjacentHTML('beforebegin', btn);
      } else if (this.currentPage == this.numberOfPages){
        let beforeElement = this.currentPage - 1;
        let nextElement = this.currentPage + 1;
        let firstBtn = `<button class='pag-numb' data-number="1">1</button>`;
        let lastBtn = `<button class='pag-numb' data-number="${this.numPages()}">${this.numPages()}</button>`;
        let beforeBtn = `<button class='pag-numb' data-number="${beforeElement}">${beforeElement}</button>`;
        let currentButton = `<button class='pag-numb active' data-number="${this.currentPage}">${this.currentPage}</button>`;
        let nextBtn = `<button class='pag-numb' data-number="${nextElement}">${nextElement}</button>`;
        let dots = `<span class='dots'>...</span>`

        paginationElement.insertAdjacentHTML('beforebegin', firstBtn);
        paginationElement.insertAdjacentHTML('beforebegin', beforeBtn);
        paginationElement.insertAdjacentHTML('beforebegin', currentButton);
        paginationElement.insertAdjacentHTML('beforebegin', nextBtn);
        paginationElement.insertAdjacentHTML('beforebegin', dots);
        paginationElement.insertAdjacentHTML('beforebegin', lastBtn);
      } else if(this.currentPage > this.numberOfPages && this.currentPage < this.numPages()) {
        let beforeElement = this.currentPage - 1;
        let nextElement = this.currentPage + 1;

        let firstBtn = `<button class='pag-numb' data-number="1">1</button>`;
        let lastBtn = `<button class='pag-numb' data-number="${this.numPages()}">${this.numPages()}</button>`;
        let beforeBtn = `<button class='pag-numb' data-number="${beforeElement}">${beforeElement}</button>`;
        let currentButton = `<button class='pag-numb active' data-number="${this.currentPage}">${this.currentPage}</button>`;
        let nextBtn = `<button class='pag-numb' data-number="${nextElement}">${nextElement}</button>`;
        let dots = `<span class='dots'>...</span>`

        if(nextElement < this.numPages() && (nextElement + 1) != this.numPages()) {
          paginationElement.insertAdjacentHTML('beforebegin', firstBtn);
          paginationElement.insertAdjacentHTML('beforebegin', dots);
          paginationElement.insertAdjacentHTML('beforebegin', beforeBtn);
          paginationElement.insertAdjacentHTML('beforebegin', currentButton);
          paginationElement.insertAdjacentHTML('beforebegin', nextBtn);
          paginationElement.insertAdjacentHTML('beforebegin', dots);
          paginationElement.insertAdjacentHTML('beforebegin', lastBtn);
        }
        if(nextElement == this.numPages()) {
          paginationElement.insertAdjacentHTML('beforebegin', firstBtn);
          paginationElement.insertAdjacentHTML('beforebegin', dots);
          paginationElement.insertAdjacentHTML('beforebegin', beforeBtn);
          paginationElement.insertAdjacentHTML('beforebegin', currentButton);
          paginationElement.insertAdjacentHTML('beforebegin', lastBtn);
        }
        if(nextElement + 1 == this.numPages()) {
          paginationElement.insertAdjacentHTML('beforebegin', firstBtn);
          paginationElement.insertAdjacentHTML('beforebegin', dots);
          paginationElement.insertAdjacentHTML('beforebegin', beforeBtn);
          paginationElement.insertAdjacentHTML('beforebegin', currentButton)
          paginationElement.insertAdjacentHTML('beforebegin', nextBtn);
          paginationElement.insertAdjacentHTML('beforebegin', lastBtn);
        }
      } else {
        let beforeElement = this.currentPage - 1;
        let bbElement = this.currentPage - 2;

        let dots = `<span class='dots'>...</span>`
        let firstBtn = `<button class='pag-numb' data-number="1">1</button>`;
        let beforeBtn = `<button class='pag-numb' data-number="${beforeElement}">${beforeElement}</button>`;
        let bbBtn = `<button class='pag-numb' data-number="${bbElement}">${bbElement}</button>`;
        let currentButton = `<button class='pag-numb active' data-number="${this.currentPage}">${this.currentPage}</button>`;

        paginationElement.insertAdjacentHTML('beforebegin', firstBtn);
        paginationElement.insertAdjacentHTML('beforebegin', dots);
        paginationElement.insertAdjacentHTML('beforebegin', bbBtn);
        paginationElement.insertAdjacentHTML('beforebegin', beforeBtn);
        paginationElement.insertAdjacentHTML('beforebegin', currentButton);
      }
    }

    this.paginationNumbersListeners();
  }

  paginationArrows() {
    let btnPrev = document.querySelector('.btn-prev');
    let btnNext = document.querySelector('.btn-next');

    this.paginationArrowsListeners(btnNext, btnPrev);
    this.checkVisibility(btnPrev, btnNext);
  }

  paginationArrowsListeners(btn_next, btn_prev) {
      btn_next.addEventListener('click', this.nextPage);
      btn_prev.addEventListener('click', this.prevPage);
  }

  paginationNumbersListeners() {
    let paginationNumberBtns = [...document.getElementsByClassName('pag-numb')];

    paginationNumberBtns.forEach(pagNum => {
      pagNum.addEventListener('click', () => {
        this.currentPage = parseInt(pagNum.dataset.number);
        this.displayList();
        this.displayCurrentNumberOfPages();
        this.paginationNumbers();
        this.paginationArrows();
        ShowMore.addListenersToBtns();
      })
    })
  }

  checkVisibility(btn_prev, btn_next) {

    this.currentPage <= 1 ? btn_prev.style.visibility = "hidden" : btn_prev.style.visibility = "visible";

    this.currentPage >= this.numPages() ? btn_next.style.visibility = "hidden" : btn_next.style.visibility = "visible";
  }

  prevPage = ()  => {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.displayList();
      this.displayCurrentNumberOfPages();
      this.paginationNumbers();
      this.paginationArrows();
      ShowMore.addListenersToBtns();
    }
  }

  nextPage = () => {
    if(this.currentPage < this.numPages()) {
      this.currentPage++;
      this.displayList();
      this.displayCurrentNumberOfPages();
      this.paginationNumbers();
      this.paginationArrows();
      ShowMore.addListenersToBtns();
    }
  }


  init() {
    this.displayList();
    this.displayCurrentNumberOfPages();
    this.paginationNumbers();
    this.paginationArrows();
    ShowMore.addListenersToBtns();
  }

  numPages() {
    return Math.ceil(this.data.length / this.recordsPerPage);
  }
}

export default Pagination;