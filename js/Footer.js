class Footer {
  constructor(copy) {
    this.copy = copy;
    this.mainFooter = document.querySelector('footer');
  }

  render() {
    this.mainFooter.innerHTML = '';
    return `<p>${this.copy}</p>`
  }
}

export default Footer;