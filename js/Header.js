class Header {
  constructor(appData, currentPage, numberOfPagesToPaginate, recordsPerPage) {
    this.appData = appData;
    this.currentPage = currentPage;
    this.numberOfPagesToPaginate = numberOfPagesToPaginate;
    this.recordsPerPage = recordsPerPage;
    this.mainHeader = document.querySelector('header')
  }

  takeSource() {
    let set = new Set();
    for(let sources of this.appData) {
      set.add(sources.source);
    }
    return [...set];
  }

  createNumberOfPages() {
    let pagesInfo = document.querySelector('.pages-info');
    pagesInfo.innerHTML = `${this.currentPage == 1 ? 1 : (this.currentPage - 1) * 10} - ${10 * this.currentPage} of ${this.recordsPerPage*this.numberOfPagesToPaginate}`;
  }

  render() {
    this.mainHeader.innerHTML = `
      <div class="number-of-pages mb-3 text-center">
        <span class="pages-info text-light fw-bold"></span>
      </div>
    `;
    this.createNumberOfPages();
    return `
      <div class='container'>
        <h1 class="header-title text-light mt-3 text-center">Sources</h1>
        <h3 class="header-sources text-light mt-2 text-center">${this.takeSource()}</h3>
      </div>
    `
  }
}

export default Header;