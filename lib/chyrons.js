const axios = require("axios");
const tsvToJSON = require("./tsvJSON");
const _ = require("lodash");
const _lib = require("./helpers");
const striptags = require("striptags");

module.exports = async hours => {
  try {
    const response = await axios.get(
      `https://archive.org/services/third-eye.php?last=${hours}`
    );
    if (response.status === 200 && response.data) {
      const bySource = {
        cnn: 0,
        bbcnews: 0,
        foxnews: 0,
        msnbc: 0
      };

      const array = tsvToJSON(response.data);
      let foxText = "",
        cnnText = "",
        bbcNewsText = "",
        msnbcText = "";

      for (let item of array) {
        if (item.channel) {
          if (item.channel.indexOf("FOX") > -1) {
            // bySource["foxnews"].push(item);
            bySource["foxnews"]++;
            foxText =
              foxText +
              striptags(item.text)
                .replace(/\r?\\n|\r/g, " ")
                .trim();
          } else if (item.channel.indexOf("CNN") > -1) {
            // bySource["cnn"].push(item);
            bySource["cnn"]++;
            cnnText =
              cnnText +
              striptags(item.text)
                .replace(/\r?\\n|\r/g, " ")
                .trim();
          } else if (item.channel.indexOf("BBC") > -1) {
            // bySource["bbcnews"].push(item);
            bySource["bbcnews"]++;
            bbcNewsText =
              bbcNewsText +
              striptags(item.text)
                .replace(/\r?\\n|\r/g, " ")
                .trim();
          } else if (item.channel.indexOf("MSNBC") > -1) {
            // bySource["msnbc"].push(item);
            bySource["msnbc"]++;
            msnbcText =
              msnbcText +
              striptags(item.text)
                .replace(/\r?\\n|\r/g, " ")
                .trim();
          }
        }
      }

      const foxTags = _lib.getTopTagsFromText(foxText);
      const cnnTags = _lib.getTopTagsFromText(cnnText);
      const bbcNewsTags = _lib.getTopTagsFromText(bbcNewsText);
      const msnbcTags = _lib.getTopTagsFromText(msnbcText);

      let getOverlap = (first, second) => {
        let common = first.filter(tag => {
          return second.find(otherTag => {
            return (
              tag.term === otherTag.term ||
              tag.term.includes(otherTag.term) ||
              otherTag.term.includes(tag.term)
            );
          });
        });

        return {
          words: common
            .sort((a, b) => {
              if (a.tf > b.tf) {
                return -1;
              } else if (b.tf > a.tf) {
                return 1;
              } else {
                return 0;
              }
            })
            .slice(0, 30),
          percentage: common.length / ((first.length + second.length) / 2)
        };
      };

      return {
        tags: {
          foxnews: foxTags,
          cnn: cnnTags,
          bbcnews: bbcNewsTags,
          msnbc: msnbcTags
          // combined: combinedTags
        },
        overlap: {
          foxToCnn: getOverlap(foxTags, cnnTags),
          foxToMSNBC: getOverlap(foxTags, msnbcTags),
          cnnToMSNBC: getOverlap(cnnTags, msnbcTags)
        },
        countBySource: bySource
        // textBySource: bySource
      };
    } else {
      return [];
    }
  } catch (error) {
    return [];
    console.log(error);
  }
};
