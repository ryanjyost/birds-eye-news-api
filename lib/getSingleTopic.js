const _ = require("lodash");
const sites = require("../sites");

module.exports = async function(
  index,
  tags,
  articles,
  articlesUsedByOtherTopics
) {
  // ok, start with the main tag
  const top = tags[index];

  // find any and all related terms
  let otherRelated = tags.filter(tag => {
    const alreadyRelated = top.related.find(item => {
      return tag.term === item.term;
    });

    return (
      (tag.term.includes(top.term) || top.term.includes(tag.term)) &&
      tag.term !== top.term &&
      !alreadyRelated
    );
  });
  let related = [...top.related, ...otherRelated].filter(tag => {
    return tag.term !== top.term;
  });

  // see what sources have covered the main topic
  let groupedByCoverage = groupByCoverage(articles, top);

  // get politics articles
  const filteredPolitics = articles.politics.filter(article => {
    return (
      article.title.toLowerCase().includes(top.term) ||
      article.description.toLowerCase().includes(top.term)
    );
  });

  // get opinion articles
  const filteredOpinions = articles.opinion.filter(article => {
    return (
      article.title.toLowerCase().includes(top.term) ||
      article.description.toLowerCase().includes(top.term)
    );
  });

  // how many articles include the term?
  const articleCount = [...filteredPolitics, ...filteredOpinions].length;

  // relate terms not just other variations of the main term
  let topRelated = related.find(tag => {
    return !tag.term.includes(top.term) && !top.term.includes(tag.term);
  });

  // start tracking articles already used
  let articlesAlreadyUsed = [...articlesUsedByOtherTopics];

  // get articles that include the main and top related, without picking same source twice
  let sourcesUsedForPolitics = [];
  let previewArticles = [];
  for (let article of filteredPolitics) {
    if (previewArticles.length > 3) {
      break;
    } else {
      let sourceUsed = sourcesUsedForPolitics.indexOf(article.siteName) > -1;
      let articleUsed = articlesAlreadyUsed.indexOf(article.id) > -1;
      if (
        !sourceUsed &&
        !articleUsed &&
        (article.title.toLowerCase().includes(top.term) &&
          (topRelated
            ? article.title.toLowerCase().includes(topRelated.term) ||
              article.description.toLowerCase().includes(topRelated.term)
            : true) &&
          article.image !== null &&
          article.description.length > 0)
      ) {
        sourcesUsedForPolitics.push(article.siteName);
        previewArticles.push(article);
        articlesAlreadyUsed.push(article.id);
      } else {
        continue;
      }
    }
  }

  let sitesUsedForOpinions = [];
  let previewOpinions = [];
  for (let article of filteredOpinions) {
    if (previewOpinions.length > 3) {
      break;
    } else {
      let articleUsed = articlesAlreadyUsed.indexOf(article.id) > -1;
      if (sitesUsedForOpinions.indexOf(article.siteName) < 0 && !articleUsed) {
        previewOpinions.push(article);
        sitesUsedForOpinions.push(article.siteName);
        articlesAlreadyUsed.push(article.id);
      }
    }
  }

  let moreArticles = [];
  for (let article of filteredPolitics) {
    if (moreArticles.length > 3) {
      break;
    } else {
      let articleUsed = articlesAlreadyUsed.indexOf(article.id) > -1;

      if (
        !articleUsed &&
        sourcesUsedForPolitics.indexOf(article.siteName) < 0
      ) {
        moreArticles.push(article);
        sourcesUsedForPolitics.push(article.siteName);
        articlesAlreadyUsed.push(article.id);
      }
    }
  }

  return {
    main: top,
    percentageFreq: articleCount / articles.combined.length,
    preview: {
      politics: previewArticles,
      opinions: previewOpinions,
      more: moreArticles
    },
    related,
    articles: {
      politics: filteredPolitics,
      opinions: filteredOpinions
    },
    sourceCoverage: groupedByCoverage
  };
};

const groupByCoverage = (articles, tag1, tag2) => {
  let grouped = _.partition(sites, site => {
    return articles.combined.find(article => {
      return (
        article.siteName === site.name &&
        (article.title.toLowerCase().includes(tag1.term) ||
          article.description.toLowerCase().includes(tag1.term)) &&
        (tag2
          ? article.title.toLowerCase().includes(tag2.term) ||
            article.description.toLowerCase().includes(tag2.term)
          : true)
      );
    });
  });

  return {
    tag1: tag1,
    tag2: tag2,
    sourceCount: sites.length,
    yes: grouped[0],
    no: grouped[1]
  };
};
