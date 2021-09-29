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
      <h1 class="header-title">Sources</h1>
      <h3 class="header-sources">${this.dataToHeader.sources}</h3>
    `
  }
}

export default Header;