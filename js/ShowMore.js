class ShowMore {
  static addListenersToBtns() {
    let showMoreBtns = [...document.getElementsByClassName('article-add-info')];
    let showLessBtns = [...document.getElementsByClassName('article-close-info')];
    showMoreBtns.forEach(btn => btn.addEventListener('click', e => toggleAddVisibility(e)))
    showLessBtns.forEach(btn => btn.addEventListener('click', e => toggleCloseVisibility(e)))
    

    function toggleAddVisibility(e) {
      let index = e.target.parentNode.parentNode.parentNode.dataset.id;
      let article = document.querySelector(`article[data-id='${index}']`);

      article.querySelector('.article-text-wrap').classList.toggle('disable');
      article.querySelector('.article-additionals').classList.toggle('disable');
    }

    function toggleCloseVisibility(e) {
      let index = e.target.parentNode.parentNode.dataset.id;
      let article = document.querySelector(`article[data-id='${index}']`);

      article.querySelector('.article-text-wrap').classList.toggle('disable');
      article.querySelector('.article-additionals').classList.toggle('disable');
    }
  }
}

export default ShowMore;