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
  optTagsListSelector = '.tags',
  optAuthorsListSelector = '.authors',
  optCloudClassCount = 4,
  optCloudClassPrefix = 'tag-size-';



function generateTitleLinks(customSelector = ''){
  let html = '';

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
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

function calculateTagsParams (tags){

  const params = {max: 0, min: 999999};


  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + 'times');

    if(tags[tag] > params.max){
      params.max = tags[tag];
    }

    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass (count, params){

  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
  console.log('classNumber: ', classNumber);

  return optCloudClassPrefix + classNumber;
}



function generateTags(){

  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const articleTagsSelector = article.querySelector(optArticleTagsSelector);
    articleTagsSelector.innerHTML = '';

    let html = '';
    const articleTags = article.getAttribute('data-tags'),
      articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray){
      const linkHTML = '<li><a href="#tag-' + tag + '">' +  tag + '</a></li>';
      html += linkHTML;

      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;

      }
    }

    articleTagsSelector.insertAdjacentHTML('afterbegin', html);
  }

  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);

  let allTagsHTML = '';

  for(let tag in allTags){

    allTagsHTML += '<li><a href="#tag-'+ tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
  }

  tagList.innerHTML = allTagsHTML;
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

  const linkTags = document.querySelectorAll('.post-tags a, .tags a');
  for(let linkTag of linkTags){
    linkTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function calculateAuthorsParams (authors){

  const params = {max: 0, min: 999999};


  for(let author in authors){
    console.log(author + ' is used ' + authors[author] + 'times');

    if(authors[author] > params.max){
      params.max = authors[author];
    }

    if(authors[author] < params.min){
      params.min = authors[author];
    }
  }

  return params;
}

function generateAuthors (){

  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const articleAuthorSelector = article.querySelector(optArticleAuthorSelector);
    articleAuthorSelector.innerHTML = '';
    let html = 'by ';
    const articleAuthor = article.getAttribute('data-author');
    const articleAuthors = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';



    if(!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    html += articleAuthors;

    articleAuthorSelector.insertAdjacentHTML('afterbegin', html);
  }

  const authorList = document.querySelector(optAuthorsListSelector);

  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams: ', authorsParams);

  let allAuthorsHTML = '';

  for(let author in allAuthors){
    allAuthorsHTML += '<li><a href="#author-'+ author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
  }

  authorList.innerHTML = allAuthorsHTML;

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

    hrefAuthor.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const linkAuthors = document.querySelectorAll('.post-author a, .authors a');

  for(let linkAuthor of linkAuthors){
    linkAuthor.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();







