const gramophone = require("gramophone");
const striptags = require("striptags");
const stopWords = require("./stopWords");

const filterTags = tag => {
  const termArray = tag.term.split(" ");
  let tooShort = false;
  if (termArray.length > 1) {
    tooShort = termArray.find(term => {
      return term.length < 2;
    });
  } else {
    tooShort = tag.term.length < 4;
  }

  if (tooShort) {
    return false;
  } else {
    return tag.tf >= 5;
  }
};

module.exports = {
  getTopTagsFromText: (text, min = 5) => {
    const combinedFrequencies = gramophone.extract(text, {
      score: true,
      min: min,
      stem: false,
      stopWords: stopWords
    });

    return combinedFrequencies.filter(filterTags);
  },

  filterTags: tag => {
    const termArray = tag.term.split(" ");
    let tooShort = false;
    if (termArray.length > 1) {
      tooShort = termArray.find(term => {
        return term.length < 2;
      });
    } else {
      tooShort = tag.term.length < 4;
    }

    if (tooShort) {
      return false;
    } else {
      return tag.tf >= 5;
    }
  }
};
