class FetchData {
  constructor() {
    this.subject = 'elections';
  }
  
  async fetchData(currentPage = 1) {
    try {
      let resolve = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.subject}&page=${currentPage}&api-key=MHzOqujuA8zCj0G6wAjAXUxsVa8Ku2a1`);
      return await resolve.json(); 
    } catch(err) {
      throw new Error(`Upss something went wrong... ${err}`)
    }
  }
}

export default FetchData;