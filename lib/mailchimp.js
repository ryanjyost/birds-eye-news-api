const request = require("request");

module.exports = {
  subscribe: async function subscribe(email) {
    const data = {
      email_address: email,
      status: "subscribed"
    };
    const listId = process.env.MAILCHIMP_LIST_ID;
    const API_KEY = process.env.MAILCHIMP_API_KEY;

    await new Promise((resolve, reject) => {
      request.post(
        {
          uri: `https://us18.api.mailchimp.com/3.0/lists/${listId}/members/`,
          headers: {
            Accept: "application/json",
            Authorization: `Basic ${Buffer.from(`apikey:${API_KEY}`).toString(
              "base64"
            )}`
          },
          json: true,
          body: data
        },
        (err, response, body) => {
          if (err) {
            reject(err);
          } else {
            resolve(body);
          }
        }
      );
    });
  }
};
