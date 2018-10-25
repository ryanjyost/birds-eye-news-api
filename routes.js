const Batch = require("./models/batch.js");
const Article = require("./models/article.js");
const sites = require("./sites.js");
const _ = require("lodash");
const getSingleSource = require("./lib/getSingleSource");
const Boom = require("boom");
const camelCase = require("camelcase");
const handleRequest = require("./lib/handleRequest");
const createUser = require("./lib/createUser");
const feedback = require("./lib/feedback");
const mailchimp = require("./lib/mailchimp");
const to = require("./lib/to");

module.exports = [
  /*======================
  * GET_FRONT_PAGES
  * */
  {
    method: "GET",
    path: "/get_front_pages",
    handler: async function(request, h) {
      return await handleRequest(request);
    }
  },

  /*======================
	* RECENT_TAGS
	* */
  {
    method: "GET",
    path: "/recent_tags",
    handler: async function(request, h) {
      return await handleRequest(request);
    }
  },

  /*======================
	* TODAY
	* */
  {
    method: "GET",
    path: "/recent_articles",
    handler: async function(request, h) {
      return await handleRequest(request);
    }
  },

  /*======================
	* ARTICLES
	* */
  {
    method: "GET",
    path: "/articles",
    handler: async function(request, h) {
      let param = {
        created_at: {
          $gte: Date.parse(request.query.start),
          $lt: Date.parse(request.query.end)
        }
      };
      let articles = await Article.find(param, function(err, articles) {
        return articles;
      }).limit(100);

      return { articles };
    }
  },

  /*======================
	* SEARCH_FRONT_PAGES
	* */
  {
    method: "GET",
    path: "/search_front_pages",
    handler: async function(request, h) {
      // BATCH
      let days = 15;
      const batches = await Batch.find(
        {
          "records.1": { $exists: true },
          created_at: {
            $gte: new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000)
          }
        }, //make sure there's records in the batch
        { id: 1, completed_at: 1, created_at: 1 },
        { sort: { created_at: -1 } },

        function(err, batch) {
          return batch;
        }
      );

      return { batches, sites };
    }
  },

  /*======================
* SOURCES
* */
  {
    method: "GET",
    path: "/sources",
    handler: async function(request, h) {
      return { sources: sites };
    }
  },

  /*======================
* Single Source
* */
  {
    method: "GET",
    path: `/sources/{source}`,
    handler: async function(request, h) {
      // source info
      let source = sites.find(site => {
        return site.name === request.params.source;
      });

      return getSingleSource(source);

      // if (data) {
      //   return { ...source, ...data };
      // }
    }
  },

  /*======================
* Chyrons
* */
  {
    method: "GET",
    path: `/chyrons/{hours}`,
    handler: async function(request, h) {
      return await handleRequest(request, [request.params.hours]);
    }
  },

  {
    method: "GET",
    path: `/top_news`,
    handler: async function(request, h) {
      return await handleRequest(request);
    }
  },

  {
    method: "GET",
    path: `/trends`,
    handler: async function(request, h) {
      return await handleRequest(request);
    }
  },

  {
    method: "GET",
    path: `/trend_timelines`,
    handler: async function(request, h) {
      return await handleRequest(request);
    }
  },

  {
    method: "GET",
    path: `/terms_for_analysis`,
    handler: async function(request, h) {
      return await handleRequest(request);
    }
  },

  /*======================
	* GET_FRONT_PAGES
	* */
  {
    method: "POST",
    path: "/term_analysis",
    handler: async function(request, h) {
      return await handleRequest(request, [request.payload.term]);
    }
  },

  /*======================
	* USERS
	* */
  {
    method: "POST",
    path: "/users",
    handler: async function(request, h) {
      if (request.payload.subscribe) {
        await to(mailchimp.subscribe(request.payload.user.user.email));
      }

      let err, user;
      [err, user] = await to(
        createUser(request.payload.user, request.payload.subscribe)
      );

      if (user) {
        return user;
      } else {
        return { error: "Something went wrong" };
      }
    }
  },
  {
    method: "POST",
    path: "/mailchimp/subscribe",
    handler: async function(request, h) {
      const email = request.payload.email;
      if (!email) {
        return { error: "Email required." };
      }

      return await mailchimp.subscribe({ email });
    }
  },

  /*======================
	* FEEDBACK
	* */
  {
    method: "POST",
    path: "/feedback",
    handler: async function(request, h) {
      return await feedback.handleNewFeedback(request.payload);
    }
  },
  {
    method: "GET",
    path: "/feedback/{user}",
    handler: async function(request, h) {
      return await feedback.getFeedbackByUser(request.params.user);
    }
  }
];
