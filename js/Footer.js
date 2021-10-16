class Footer {
  constructor(copy) {
    this.copy = copy;
  }

  render() {
    return `<p>${this.copy}</p>`;
  }
}

export default Footer;