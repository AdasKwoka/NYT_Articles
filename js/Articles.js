import Article from './Article.js'

class Articles {
  constructor(data) {
    this.articles = this.createArticles(data);
    this.main = document.querySelector('main');
  }

  createArticles(data) {
    let content = data.map(({ section_name, byline, headline, web_url, lead_paragraph, source, multimedia, pub_date }) => {
      return ({
        section_name,
        author: byline.person[0]?.firstname || byline.person[0]?.lastname ? 
          `${byline.person[0]?.firstname} ${byline.person[0]?.lastname}` : 
          'Annonymous',
        title: headline.main,
        url_website: web_url,
        lead_paragraph,
        source,
        url_small: multimedia[0] ? "https://www.nytimes.com/" + multimedia[0].url : "./images/default_photo.jpg",
        url_big: multimedia[0] ? "https://www.nytimes.com/" + multimedia[0].legacy.xlarge : "./images/default_photo.jpg",
        date: pub_date
      })
    });

    return content.map(info => {
      let article = new Article(info);
      return article.render();
    })
  }

  displayArticles() {
    this.main.innerHTML = `
        <h1 class="header-main-articles w-100vw bg-dark text-light text-center py-1">Articles</h1>
        <div class='articles-wrapper'></div>
        <div class='pagination-element'></div>
    `
    this.articles.forEach(article => {
      document.querySelector('.articles-wrapper').innerHTML += article;     
    })
  }

  addListenersToBtns() {
    let toggleBtns = [...document.getElementsByClassName('article-add-info')];
    toggleBtns.forEach(btn => btn.addEventListener('click', e => this.toggleVisibility(e)))   
  }

  toggleVisibility(e) {
    let index = e.target.parentNode.parentNode.parentNode.dataset.id;
    let article = document.querySelector(`article[data-id='${index}']`);
    let additionals = article.querySelector('.article-additionals');
    additionals.classList.toggle('disable');
    e.target.textContent = !additionals.classList.contains('disable') ? 'Close' : 'Show info'
  }
}

export default Articles;