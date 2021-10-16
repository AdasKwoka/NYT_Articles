class Header {
  constructor(appData, currentPage, numberOfPagesToPaginate, recordsPerPage) {
    this.appData = appData;
    this.currentPage = currentPage;
    this.numberOfPagesToPaginate = numberOfPagesToPaginate;
    this.recordsPerPage = recordsPerPage;
    this.mainHeader = document.querySelector('header');
  }

  takeSource(appData) {
    let set = new Set();
    for(let sources of appData) {
      set.add(sources.source);
    }
    return [...set];
  }

  createNumberOfPages(currentPage) {
    let pagesInfo = document.querySelector('.pages-info');
    pagesInfo.innerHTML = `${currentPage == 1 ? 1 : (currentPage - 1) * 10} - ${10 * currentPage} of ${this.recordsPerPage * this.numberOfPagesToPaginate}`;
  }

  updateHeaderInfo(currentPage, appData) {
    this.createNumberOfPages(currentPage);
    document.querySelector(".header-sources").innerHTML = `${this.takeSource(appData)}`
  }

  render() {
    this.createNumberOfPages(this.currentPage);
    return `
      <div class='container'>
        <h1 class="header-title text-light mt-3 text-center">Sources</h1>
        <h3 class="header-sources text-light mt-2 text-center">${this.takeSource(this.appData)}</h3>
      </div>
    `;
  };
}

export default Header;