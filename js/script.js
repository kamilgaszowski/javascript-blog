'use strict';

function titleClickHandler(event){
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  event.preventDefault();
  const clickedElement = this;
  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href'),
    targetArticle = document.querySelector(articleSelector),
    clickedArticle = targetArticle;
  clickedArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors.list';



function generateTitleLinks(customSelector = ''){

  let html = '';

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){

    const articleId = article.getAttribute('id'),
      articleTitle = article.querySelector(optTitleSelector).innerHTML,
      linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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

  let allTags = [];
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const articleTagsSelector = article.querySelector(optArticleTagsSelector);
    articleTagsSelector.innerHTML = '';

    let html = '';
    const articleTags = article.getAttribute('data-tags'),
      articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray){
      const tags = '<li><a href="#tag-' + tag + '">' +  tag + '</a></li>';
      html += tags;

      if(allTags.indexOf(tags) == -1){
        allTags.push(tags);
      }
    }

    articleTagsSelector.insertAdjacentHTML('afterbegin', html);
  }
  const tagList = document.querySelector('.tags');
  tagList.innerHTML = allTags.join('');
}
generateTags();

function tagClickHandler(event){

  event.preventDefault();
  const clickedElement = this,
    href = clickedElement.getAttribute('href'),
    tag = href.replace('#tag-', ''),
    activeLinkTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let activeLinkTag of activeLinkTags){
    activeLinkTag.classList.remove('active');
  }

  const hrefTags = document.querySelectorAll('a[href="' + href + '"]');

  for(let hrefTag of hrefTags){
    hrefTag.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  const linkTags = document.querySelectorAll('.post-tags a');
  for(let linkTag of linkTags){
    linkTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();


function generateAuthors (){

  let allAuthors = [];
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const articleAuthorSelector = article.querySelector(optArticleAuthorSelector);
    articleAuthorSelector.innerHTML = '';
    let html = 'by ';
    const articleAuthor = article.getAttribute('data-author'),
      articleAuthors = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';

    if(allAuthors.indexOf(articleAuthors) == -1){
      allAuthors.push(articleAuthors);
    }
    html += articleAuthors;
    articleAuthorSelector.insertAdjacentHTML('afterbegin', html);
  }
  const authorList = document.querySelector('.authors');
  authorList.innerHTML = allAuthors.join('');
}

generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this,
    href = clickedElement.getAttribute('href'),
    author = href.replace('#author-', ''),
    activeLinkAuthors = document.querySelectorAll('a.active[href^="#author-"]');

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







