class ShowMore {
  static addListenersToBtns() {
    let toggleBtns = [...document.getElementsByClassName('article-add-info')];
    toggleBtns.forEach(btn => btn.addEventListener('click', e => toggleVisibility(e)))
    

    function toggleVisibility(e) {
      let index = e.target.parentNode.parentNode.parentNode.dataset.id;
      let article = document.querySelector(`article[data-id='${index}']`);
      let additionals = article.querySelector('.article-additionals');
      additionals.classList.toggle('disable');

      e.target.textContent = !additionals.classList.contains('disable') ? 'Close' : 'Show info'
    }
  }
}

export default ShowMore;