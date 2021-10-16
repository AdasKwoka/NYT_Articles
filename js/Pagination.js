class Pagination {
  constructor(observer) {
    this.currentPage = 1;
    this.recordsPerPage = 10;
    this.numberOfPagesToPaginate = 10;
    this.numberOfPagesToDisplay = 3;
    this.main = document.querySelector('main');
    this.observer = observer;
  }

  paginationNumbers() {
    let paginationElement = document.querySelector('.btn-next');

    this.removeOldNumbers();

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

    this.checkVisibility();
    this.toggleActiveNumber();
  }

  addListenersToPaginationButtons() {
    let btnPrev = document.querySelector('.btn-prev');
    let btnNext = document.querySelector('.btn-next');

    btnNext.addEventListener('click', this.nextPage);
    btnPrev.addEventListener('click', this.prevPage);

    document.addEventListener('click', (e) => {
      if(e.target && e.target.className.includes('pag-numb')) {
        this.currentPage = parseInt(e.target.dataset.number);
        this.checkVisibility();
        this.observer.publish('change currentPage', this.currentPage);
      }
    })
  }

  checkVisibility() {
    let btnPrev = document.querySelector('.btn-prev');
    let btnNext = document.querySelector('.btn-next');

    if(this.currentPage <= 1) {
      btnPrev.disabled = true;
    } else {
      btnPrev.disabled = false;
    }

    if(this.currentPage >= this.numberOfPagesToPaginate) {
      btnNext.disabled = true;
    } else {
      btnNext.disabled = false;
    }
  }

  prevPage = ()  => {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.paginationNumbers();
      this.observer.publish('change currentPage', this.currentPage);
    }
  }

  nextPage = () => {
    if(this.currentPage < this.numberOfPagesToPaginate) {
      this.currentPage++;
      this.paginationNumbers();
      this.observer.publish('change currentPage', this.currentPage);

    }
  }

  removeOldNumbers() {
    let paginationNumberNodes = [...document.querySelectorAll('.pag-numb')];
    let paginationDotsNodes = [...document.querySelectorAll('.dots')];

    if(paginationNumberNodes.length > 0) {
      for(let i = 0; i < paginationNumberNodes.length; i++) {
        document.querySelector('.pagination-element').removeChild(paginationNumberNodes[i]);
      }
      for(let i = 0; i < paginationDotsNodes.length; i++) {
        document.querySelector('.pagination-element').removeChild(paginationDotsNodes[i]);
      }
    }
  }

  render() {
    this.paginationNumbers();
  }

  toggleActiveNumber() {
    let paginationNumberBtns = [...document.getElementsByClassName('pag-numb')];

    paginationNumberBtns.forEach(btn => {
      if(btn.dataset.number == this.currentPage) {
        btn.classList.add('active');
      };
    });
  }
}

export default Pagination;