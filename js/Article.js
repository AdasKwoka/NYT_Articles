class Article {
  constructor({ author, title, lead_paragraph, section_name, url_big, url_small, url_website, date }) {
    this.author = author;
    this.date = new Date(date);
    this.lead_paragraph = lead_paragraph;
    this.section_name = section_name;
    this.title = title;
    this.url_big = url_big;
    this.url_website = url_website;
    this.url_small = url_small;
    this.id = Date.now() + Math.floor(Math.random() * 100);
  }

  createDate() {
    return `${this.date.toLocaleDateString('en', { weekday: 'long' })}, ${this.date.toLocaleDateString('en', { month: 'long' })} ${this.date.getDate()}, ${this.date.getFullYear()}`;
  }

  init() {
    return `
      <article class='article d-flex d-column border-bottom flex-wrap justify-content-center' data-id="${this.id}">
        <div class='article-text-wrap container row'>
          <div class='article-img-wrap overflow-hidden col-3 ps-0 pe-0 mt-2'>
            <img class='mw-100 mh-100' src='${this.url_small}' alt='article-main-image'/>
          </div>
          <a class='article-header fs-6 fw-bold text-decoration-none text-primary text-start text-wrap d-block ps-2 pe-0 col-9 mt-2 d-md-flex justify-content-md-center align-items-md-center' href='${this.url_website}' target='_blank'><span>${this.title}<span></a>  
          <div class='article-text mt-sm-3 col-12 ps-0 pe-0 me-0 ms-0'>
            <p class='article-description mb-1'>${this.lead_paragraph}</p>
            <p class='article-date mb-1 text-end'>${this.createDate()}</p>
            <button type="button" class="article-btn article-add-info btn btn-primary btn-sm mx-auto d-block mb-2 mb-sm-4">Show info</button>
          </div>      
        </div>
        <div class='article-additionals w-100 row disable'>
          <div class="big-img-wrap col overflow-hidden">
            <img class="mw-100 mh-100" src=${this.url_big} alt='article-additional-image'/>
          </div>
          <div class="d-flex flex-column justify-content-center flex-wrap col">
            <p class='article-author w-100 text-center'><span class='art-desc d-block fw-bold'>Author</span>${this.author}</p>
            <p class='article-section-name w-100 text-center'><span class='art-desc d-block fw-bold'>Section name</span>${this.section_name}</p>
          </div>      
        </div>
      </article>
    `
  }
}

export default Article;