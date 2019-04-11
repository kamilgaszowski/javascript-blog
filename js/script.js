'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-cloud-link').innerHTML),
  authorsList: Handlebars.compile(document.querySelector('#template-author-list').innerHTML)
};

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

    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);    html = html + linkHTML;

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
      const linkHTMLData = {id: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
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

  const allTagsData = {tags: []};

  for(let tag in allTags){

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData: ', allTagsData);
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
    let html = '';
    const articleAuthor = article.getAttribute('data-author');

    const linkHTMLData = {id: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);



    if(!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    html += linkHTML;

    articleAuthorSelector.insertAdjacentHTML('afterbegin', html);
  }

  const authorList = document.querySelector(optAuthorsListSelector);

  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams: ', authorsParams);

  let allAuthorsData = {authors: []};

  for(let author in allAuthors){
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });
  }

  authorList.innerHTML = templates.authorsList(allAuthorsData);
  console.log('allAuthorsData: ', allAuthorsData);

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







