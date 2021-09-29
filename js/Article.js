class Article {
  constructor({ title, lead_paragraph, url_small, date }) {
    this.date = new Date(date);
    this.lead_paragraph = lead_paragraph;
    this.title = title;
    this.url_small = url_small;
  }

  createDate() {
    return `${this.date.toLocaleDateString('en', { weekday: 'long' })}, ${this.date.toLocaleDateString('en', { month: 'long' })} ${this.date.getDate()}, ${this.date.getFullYear()}`;
  }

  init() {
    return `
      <article class='article'>
        <div class='article-text'>
          <a class='article-header' href='${this.title}' target='_blank'>${this.title}</a>
          <p class='article-description'>${this.lead_paragraph}</p>
          <p class='article-date'>${this.createDate()}</p>
        </div>
        <div class='article-img-wrap'>
          <img src='${this.url_small}' alt='article-main-image'/>
        </div>  
      </article>
    `
  }
}

export default Article;