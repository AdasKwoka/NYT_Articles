class Footer {
  constructor({ copy }) {
    this.copy = String([...copy]);
  }

  init() {
    return `<p>${this.copy}</p>`
  }
}

export default Footer;