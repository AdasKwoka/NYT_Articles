class FetchData {
  subjects = ["elections", "lion", "elephant"];
  async fetchData(url) {
    try {
      let resolvesArr = [];
      for(let i = 0; i < this.subjects.length; i++) {
        let resolve = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.subjects[i]}&api-key=MHzOqujuA8zCj0G6wAjAXUxsVa8Ku2a1`);
        resolvesArr.push(await resolve.json());
      }
      return resolvesArr;

    } catch(err) {
      throw new Error(`Upss something went wrong... ${err}`)
    }
  }

  async init(url) {
    return await this.fetchData(url);
  }
}

export default FetchData;