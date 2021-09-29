class FetchData {
  async fetchData(url) {
    try {
      let resolve = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=elections&api-key=MHzOqujuA8zCj0G6wAjAXUxsVa8Ku2a1')
      return resolve.json();

    } catch(err) {
      throw new Error(`Upss something went wrong... ${err}`)
    }
  }

  async init(url) {
    return await this.fetchData(url);
  }
}

export default FetchData;