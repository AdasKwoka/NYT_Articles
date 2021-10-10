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

    if(this.numberOfPagesToPaginate <= 4) {
      for(let i = 1; i <= 4; i++) {
        let btn = `<button class='pag-numb ${i == this.currentPage ? ' active' : ''}' data-number="${i}">${i}</button>`;
        paginationElement.insertAdjacentHTML('beforebegin', btn);
      }
    } else {
      if(this.currentPage <= 2) {
        for(let i = 1; i <= 3; i++) {
          let btn = `<button class='pag-numb ${i == this.currentPage ? ' active' : ''}' data-number="${i}">${i}</button>`;
          paginationElement.insertAdjacentHTML('beforebegin', btn);
        }
        paginationElement.insertAdjacentHTML('beforebegin', `
          <span class='dots'>...</span>
          <button class='pag-numb' data-number="${this.numberOfPagesToPaginate}">${this.numberOfPagesToPaginate}</button>
        `)
      } else if(this.currentPage > this.numberOfPagesToDisplay && this.currentPage < this.numberOfPagesToPaginate - 2) {
        paginationElement.insertAdjacentHTML('beforebegin', `
          <button class='pag-numb' data-number="${1}">1</button>
          <span class='dots'>...</span>
        `);
        for(let i = -1; i <= 1; i++) {
          let btn = `<button class='pag-numb' data-number="${this.currentPage + i}">${this.currentPage + i}</button>`;
          paginationElement.insertAdjacentHTML('beforebegin', btn);
        }
        paginationElement.insertAdjacentHTML('beforebegin', `
          <span class='dots'>...</span>
          <button class='pag-numb' data-number="${this.numberOfPagesToPaginate}">${this.numberOfPagesToPaginate}</button>
        `);
      } else if( this.currentPage == this.numberOfPagesToDisplay) {
        paginationElement.insertAdjacentHTML('beforebegin', `
          <button class='pag-numb' data-number="${1}">1</button>
          <span class='dots'>...</span>
        `);
        for(let i = 0; i <= 2; i++) {
          let btn = `<button class='pag-numb' data-number="${this.currentPage + i}">${this.currentPage + i}</button>`;
          paginationElement.insertAdjacentHTML('beforebegin', btn);
        }
        paginationElement.insertAdjacentHTML('beforebegin', `
          <span class='dots'>...</span>
          <button class='pag-numb' data-number="${this.numberOfPagesToPaginate}">${this.numberOfPagesToPaginate}</button>
        `);
      } else if( this.currentPage == this.numberOfPagesToPaginate) {
        paginationElement.insertAdjacentHTML('beforebegin', `
          <button class='pag-numb' data-number="${1}">1</button>
          <span class='dots'>...</span>
        `);
        for(let i = 2; i >= 0; i--) {
          let btn = `<button class='pag-numb' data-number="${this.currentPage - i}">${this.currentPage - i}</button>`;
          paginationElement.insertAdjacentHTML('beforebegin', btn);
        }
      } else if( this.currentPage + 2 == this.numberOfPagesToPaginate) {
        paginationElement.insertAdjacentHTML('beforebegin', `
          <button class='pag-numb' data-number="${1}">1</button>
          <span class='dots'>...</span>
        `);
        for(let i = 0; i <= 2; i++) {
          let btn = `<button class='pag-numb' data-number="${this.currentPage + i}">${this.currentPage + i}</button>`;
          paginationElement.insertAdjacentHTML('beforebegin', btn);
        }
      } else if( this.currentPage + 1 == this.numberOfPagesToPaginate) {
        paginationElement.insertAdjacentHTML('beforebegin', `
          <button class='pag-numb' data-number="${1}">1</button>
          <span class='dots'>...</span>
        `);
        for(let i = -1; i <= 1; i++) {
          let btn = `<button class='pag-numb' data-number="${this.currentPage + i}">${this.currentPage + i}</button>`;
          paginationElement.insertAdjacentHTML('beforebegin', btn);
        }
      }
    }

    this.paginationNumbersListeners();
    this.toggleActiveNumber();
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
      pagNum.addEventListener('click', (e) => {
        this.currentPage = parseInt(pagNum.dataset.number);
        this.paginationArrows();
        this.paginationNumbers();
        this.observer.publish('change currentPage', this.currentPage);
      })
    })
    
  }

  toggleActiveNumber(e) {
    let paginationNumberBtns = [...document.getElementsByClassName('pag-numb')];

    paginationNumberBtns.forEach(btn => {
      if(btn.dataset.number == this.currentPage) {
        btn.classList.add('active');
      }
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