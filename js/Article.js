class Article {
  constructor({ author, title, lead_paragraph, section_name, url_big, url_small, date }) {
    this.author = author;
    this.date = new Date(date);
    this.lead_paragraph = lead_paragraph;
    this.section_name = section_name;
    this.title = title;
    this.url_big = url_big;
    this.url_small = url_small;
    this.id = Date.now() + Math.floor(Math.random() * 100);
  }

  createDate() {
    return `${this.date.toLocaleDateString('en', { weekday: 'long' })}, ${this.date.toLocaleDateString('en', { month: 'long' })} ${this.date.getDate()}, ${this.date.getFullYear()}`;
  }

  init() {
    return `
      <article class='article' data-id="${this.id}">
        <div class='article-text-wrap'>
          <div class='article-text'>
            <a class='article-header' href='${this.title}' target='_blank'>${this.title}</a>
            <p class='article-description'>${this.lead_paragraph}</p>
            <p class='article-date'>${this.createDate()}</p>
            <button class="article-btn article-add-info">Show info</button>
          </div>
          <div class='article-img-wrap'>
            <img src='${this.url_small}' alt='article-main-image'/>
          </div>
        </div>
        <div class='article-additionals disable'>
          <p class='article-author'><span class='art-desc'>Author</span>${this.author}</p>
          <p class='article-section-name'><span class='art-desc'>Section name</span>${this.section_name}</p>
          <div class="big-img-wrap">
            <img src=${this.url_big} alt='article-additional-image'/>
          </div>
          <button class="article-btn article-close-info">Close</button>
        </div>
      </article>
    `
  }
}

export default Article;