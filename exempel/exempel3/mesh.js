#!/usr/bin/env node
var program = require('commander'),
    FormData = require('form-data'),
    form = new FormData(),
    cheerio = require('cheerio');

program
  .version('0.0.1')
  .usage('<keywords> [options]')
  .option('-v, --visa [term]', 'Visa förklaring')
  .parse(process.argv);

if (!program.args.length) {
  program.help();
} else {
  var keywords = program.args.toString().replace(/,/g, ' ');
  if (program.visa) {

    // TODO: Hämta förklaring
    console.log('Visa förklaring');
  } else {
    form.append('mode', 'allfields');
    form.append('Term', keywords);
    form.submit('http://mesh.kib.ki.se/swemesh/swebrowse.cfm', function(err, res) {
      if (err) {
        console.log('Sökning misslyckades...');
        process.exit(1);
      } else {
        var body = '';
      
        res.on('data', function(data) {
      	  body += data.toString();
        });

        res.on('end', function() {
      	  $ = cheerio.load(body);
          var sq = ('#contentHolder td a');
          if ($(sq).length) {
            $(sq).each(function(i, elem) {
              console.log($(this).text());
            });
          } else {
            console.log('Hittade inga resultat...');
          }
          process.exit(0);
        });

      }
    });
  }
}