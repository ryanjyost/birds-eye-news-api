// const request = require("request");

//
// module.exports = async function() {
//   return request.get(
//     "https://archive.org/services/third-eye.php?last=3",
//     function(error, response, body) {
//       if (!error && response.statusCode == 200) {
//         let tsv = body;
//         // Continue with your processing here.
//         let result = tsvJSON(tsv);
//         return result;
//       }
//     }
//   );
// };

//var tsv is the TSV file with headers
module.exports = function(tsv) {
  var lines = tsv.split("\n");

  var result = [];

  var headers = lines[0].split("\t");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split("\t");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  //return result; //JavaScript object
  return result; //JSON
};
