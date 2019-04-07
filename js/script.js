'use strict';

function titleClickHandler(event){


  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  event.preventDefault();
  const clickedElement = this;
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */


  const clickedArticle = targetArticle;
  clickedArticle.classList.add('active');
}



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

let html = ' ';

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(optArticleSelector + customSelector);

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element AND get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';


    /* [DONE] insert link into titleList */

    html = html + linkHTML;

  }

  titleList.insertAdjacentHTML('afterbegin', html);

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();


function generateTags(){
  /* [DONE]  find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE]  START LOOP: for every article: */

  for(let article of articles){

    /* [DONE]  find tags wrapper */

    const articleTagsSelector = article.querySelector(optArticleTagsSelector);
    articleTagsSelector.innerHTML = '';


    /* [DONE]  make html variable with empty string */

    let html = '';

    /* [DONE]  get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* [DONE]  split tags into array */

    const articleTagsArray = articleTags.split(' ');
    /* [DONE]  START LOOP: for each tag */

    for(let tag of articleTagsArray){
      /* [DONE]  generate HTML of the link */

      const tags = '<li><a href="#tag-' + tag + '">' +  tag + '</a></li>';
      /* [DONE]  add generated code to html variable */

      html += tags;

    }
    /* END LOOP: for each tag */

    /* [DONE] insert HTML of all the links into the tags wrapper*/
    articleTagsSelector.insertAdjacentHTML('afterbegin', html);


  }
  /* END LOOP: for every article: */

}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const activeLinkTags = document.querySelectorAll('a.active[href^="#tag-"]');


  /* START LOOP: for each active tag link */
  for(let activeLinkTag of activeLinkTags){

    /* remove class active */

    activeLinkTag.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  const hrefTags = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let hrefTag of hrefTags){

    /* add class active */

    hrefTag.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  /* find all links to tags */

  const linkTags = document.querySelectorAll('.post-tags a');


  /* START LOOP: for each link */
  for(let linkTag of linkTags){

    linkTag.addEventListener('click', tagClickHandler);
    /* add tagClickHandler as event listener for that link */
  }

  /* END LOOP: for each link */
}

addClickListenersToTags();


function generateAuthors (){

/* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);


/* START LOOP: for every article: */

  for(let article of articles){

    /* find author wrapper */

    const articleAuthorSelector = article.querySelector(optArticleAuthorSelector);
    articleAuthorSelector.innerHTML = '';

    /* make html variable string */

    let html = 'by ';

    /* get authors from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');

 /* generate HTML of the link */

    const articleAuthors = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      /* add generated code to html variable */

    html += articleAuthors;
    /* insert HTML into authors wrapper */

    articleAuthorSelector.insertAdjacentHTML('afterbegin', html);

    /* END LOOP: for every article */
  }

}

generateAuthors();

function authorClickHandler(event){

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');


  const author = href.replace('#author-', '');

  const activeLinkAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for(let activeLinkAuthor of activeLinkAuthors){

    activeLinkAuthor.classList.remove('active');
  }

  const hrefAuthors = document.querySelectorAll('a[href="' + href + '"]');

  for(let hrefAuthor of hrefAuthors){
    console.log(hrefAuthor);
    hrefAuthor.classList.add('active');

  }

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){

  const linkAuthors = document.querySelectorAll('.post-author a');

  for(let linkAuthor of linkAuthors){
    linkAuthor.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();





