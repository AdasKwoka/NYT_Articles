import Article from './Article.js'

class Articles {
  constructor({ data }) {
    this.articles = this.createArticles(data);
  }

  createArticles(data) {
    let content = data.response.docs.map(doc => {
      return ({
        section_name: doc.section_name,
        author: doc.byline.person[0]?.firstname || doc.byline.person[0]?.lastname ? 
          `${doc.byline.person[0]?.firstname} ${doc.byline.person[0]?.lastname}` : 
          'Annonymous',
        title: doc.web_url,
        lead_paragraph: doc.lead_paragraph,
        source: doc.source,
        url_small: doc.multimedia[0] ? "https://www.nytimes.com/" + doc.multimedia[0].url : "./images/default_photo.jpg",
        url_big: doc.multimedia[0] ? "https://www.nytimes.com/" + doc.multimedia[0].legacy.xlarge : "./images/default_photo.jpg",
        date: doc.pub_date
      })
    });

    return content.map(info => {
      let article = new Article(info);
      return article.init();
    })
  }

  init() {
    return this.articles;
  }
}

export default Articles;