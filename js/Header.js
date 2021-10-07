class Header {
  constructor({ data }) {
    this.dataToHeader = this.takeSource(data);
  }

  takeSource(data) {
    let set = new Set();
    for(let source of data.response.docs) {
      set.add(source.source);
    }
    return ({
      sources: [...set],
    })
  }

  init() {
    return `
      <div class='container'>
        <h1 class="header-title text-light mt-3 text-center">Sources</h1>
        <h3 class="header-sources text-light mt-2 text-center">${this.dataToHeader.sources}</h3>
      </div>
    `
  }
}

export default Header;