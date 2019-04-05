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



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

let html = ' ';

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('titleList: ', titleList);

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(optArticleSelector, customSelector)
  for(let article of articles){

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element AND get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';


    /* [DONE] insert link into titleList */

    html = html + linkHTML;
    console.log(html);

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
    console.log('articleTagsSelector: ', articleTagsSelector);


    /* [DONE]  make html variable with empty string */

    let html = '';

    /* [DONE]  get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* [DONE]  split tags into array */

    const articleTagsArray = articleTags.split(' ');
    /* [DONE]  START LOOP: for each tag */

    for(let tag of articleTagsArray){
      console.log(tag);
      /* [DONE]  generate HTML of the link */

      const tags = '<li><a href="#tag-' + tag + '">' +  tag + '</a></li>';
      console.log('tags: ', tags);
      /* [DONE]  add generated code to html variable */

      html += tags;
      console.log(html);

    }
    /* END LOOP: for each tag */

    /* [DONE] insert HTML of all the links into the tags wrapper*/
    articleTagsSelector.insertAdjacentHTML('afterbegin', html);
    console.log(articleTagsSelector);


  }
  /* END LOOP: for every article: */

}

generateTags();

function tagClickHandler(event){
  console.log('Tag was clicked!');
  console.log(event);
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('clickedElement: ', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('href: ', href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log('tag: ', tag);

  /* find all tag links with class active */

  const activeLinkTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeLinkTags: ', activeLinkTags);


  /* START LOOP: for each active tag link */
  for(let activeLinkTag of activeLinkTags){
    console.log('activeLinkTag: ', activeLinkTag);

    /* remove class active */

    activeLinkTag.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

    const hrefTags = document.querySelectorAll('a[href="' + href + '"]');
    console.log('hrefTags: ', hrefTags);

  /* START LOOP: for each found tag link */
  for(let hrefTag of hrefTags){
    console.log('hrefTag: ', hrefTag);

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
  console.log('linkTags: ', linkTags);


  /* START LOOP: for each link */
  for(let linkTag of linkTags){

    linkTag.addEventListener('click', tagClickHandler);
    /* add tagClickHandler as event listener for that link */
  }

  /* END LOOP: for each link */
}

addClickListenersToTags();
