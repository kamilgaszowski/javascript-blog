'use strict';

function titleClickHandler(event){
	console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  	const activeLinks = document.querySelectorAll('.titles a.active');

  	for(let activeLink of activeLinks){
  		activeLink.classList.remove('active');
  	}

  /* [DONE] add class 'active' to the clicked link */

  event.preventDefault();
  const clickedElement = this;
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  	const activeArticles = document.querySelectorAll('article.active');

  	for(let activeArticle of activeArticles){
  		activeArticle.classList.remove('active');
  	}

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */


  const clickedArticle = targetArticle;
  clickedArticle.classList.add('active');
  console.log('clickedArticle:', clickedArticle);  
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector).innerHTML = '';

  /* [IN PROGRESS] for each article */

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
 
    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element AND get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
  }
}

generateTitleLinks();


