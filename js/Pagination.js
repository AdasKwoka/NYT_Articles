import FetchData from "./FetchData.js";

class Pagination {
  constructor(observer) {
    this.currentPage = 1;
    this.recordsPerPage = 10;
    this.numberOfPagesToPaginate = 10;
    this.numberOfPagesToDisplay = 3;
    this.main = document.querySelector('main')
    this.newData = new FetchData();
    this.observer = observer;
  }

  paginationNumbers() {
    let paginationElement = document.querySelector('.btn-next');
    let page_count = this.numberOfPagesToPaginate;

    if(page_count <= this.numberOfPagesToDisplay){
      for(let i = 1; i <= page_count; i++) {
        let btn = `<button class='pag-numb ${i == this.currentPage ? ' active' : ''}' data-number="${i}">${i}</button>`;
        paginationElement.insertAdjacentHTML('beforebegin', btn);
      }
    } else {
      if(this.currentPage < this.numberOfPagesToDisplay) {
        for(let i = 1; i <= this.numberOfPagesToDisplay; i++) {
          let btn = `<button class='pag-numb ${i == this.currentPage ? ' active' : ''}' data-number="${i}">${i}</button>`;
  
          paginationElement.insertAdjacentHTML('beforebegin', btn);
        }
        let dots = `<span class='dots'>...</span>`
        paginationElement.insertAdjacentHTML('beforebegin', dots)
        let btn = `<button class='pag-numb' data-number="${this.numberOfPagesToPaginate}">${this.numberOfPagesToPaginate}</button>`
        paginationElement.insertAdjacentHTML('beforebegin', btn);
      } else if (this.currentPage == this.numberOfPagesToDisplay){
        let beforeElement = this.currentPage - 1;
        let nextElement = this.currentPage + 1;
        let firstBtn = `<button class='pag-numb' data-number="1">1</button>`;
        let lastBtn = `<button class='pag-numb' data-number="${this.numberOfPagesToPaginate}">${this.numberOfPagesToPaginate}</button>`;
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
      } else if(this.currentPage > this.numberOfPagesToDisplay && this.currentPage < this.numberOfPagesToPaginate) {
        let beforeElement = this.currentPage - 1;
        let nextElement = this.currentPage + 1;

        let firstBtn = `<button class='pag-numb' data-number="1">1</button>`;
        let lastBtn = `<button class='pag-numb' data-number="${this.numberOfPagesToPaginate}">${this.numberOfPagesToPaginate}</button>`;
        let beforeBtn = `<button class='pag-numb' data-number="${beforeElement}">${beforeElement}</button>`;
        let currentButton = `<button class='pag-numb active' data-number="${this.currentPage}">${this.currentPage}</button>`;
        let nextBtn = `<button class='pag-numb' data-number="${nextElement}">${nextElement}</button>`;
        let dots = `<span class='dots'>...</span>`

        if(nextElement < this.numberOfPagesToPaginate && (nextElement + 1) != this.numberOfPagesToPaginate) {
          paginationElement.insertAdjacentHTML('beforebegin', firstBtn);
          paginationElement.insertAdjacentHTML('beforebegin', dots);
          paginationElement.insertAdjacentHTML('beforebegin', beforeBtn);
          paginationElement.insertAdjacentHTML('beforebegin', currentButton);
          paginationElement.insertAdjacentHTML('beforebegin', nextBtn);
          paginationElement.insertAdjacentHTML('beforebegin', dots);
          paginationElement.insertAdjacentHTML('beforebegin', lastBtn);
        }
        if(nextElement == this.numberOfPagesToPaginate) {
          paginationElement.insertAdjacentHTML('beforebegin', firstBtn);
          paginationElement.insertAdjacentHTML('beforebegin', dots);
          paginationElement.insertAdjacentHTML('beforebegin', beforeBtn);
          paginationElement.insertAdjacentHTML('beforebegin', currentButton);
          paginationElement.insertAdjacentHTML('beforebegin', lastBtn);
        }
        if(nextElement + 1 == this.numberOfPagesToPaginate) {
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
    let btn_next = `<button class="btn-next">&gt</button>`;
    let btn_prev = `<button class="btn-prev">&lt</button>`;
    let paginationElement = document.querySelector('.pagination-element')

    paginationElement.innerHTML = btn_prev + btn_next;

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
        this.paginationArrows();
        this.paginationNumbers();
        this.observer.publish('change currentPage', this.currentPage);
      })
    })
    
  }

  checkVisibility(btn_prev, btn_next) {

    this.currentPage <= 1 ? btn_prev.style.visibility = "hidden" : btn_prev.style.visibility = "visible";

    this.currentPage >= this.numberOfPagesToPaginate ? btn_next.style.visibility = "hidden" : btn_next.style.visibility = "visible";
  }

  prevPage = ()  => {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.paginationArrows();
      this.paginationNumbers();
      this.observer.publish('change currentPage', this.currentPage);
    }
  }

  nextPage = () => {
    if(this.currentPage < this.numberOfPagesToPaginate) {
      this.currentPage++;
      this.paginationArrows();
      this.paginationNumbers();
      this.observer.publish('change currentPage', this.currentPage);

    }
  }

  render() {
    this.paginationArrows();
    this.paginationNumbers();
  }
}

export default Pagination;