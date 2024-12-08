function filterAndScroll() {
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const articles = document.querySelectorAll('.article-preview');
    let firstMatch = null;
  
    articles.forEach((article) => {
      const title = article.getAttribute('data-title').toLowerCase();
      if (title.includes(searchInput)) {
        article.style.display = 'block';
        if (!firstMatch) {
          firstMatch = article;
        }
      } else {
        article.style.display = 'none';
      }
    });
  
    // Auto-scroll to the first matching article
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

