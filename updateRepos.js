const fs = require("fs");
const request = require('request');
const emoji = require("github-emoji");

const options = {
    url: 'https://api.github.com/search/repositories?q=user:allakazan',
    headers: {
      'User-Agent': 'Node Request'
    }
  };

function convertToEmoji(text) {
    if (text == null) return;
    text = text.toString();
    var pattern = /(?<=:\s*).*?(?=\s*:)/gs;
    if (text.match(pattern) != null) {
        var str = text.match(pattern);
        str = str.filter(function (arr) {
            return /\S/.test(arr);
        });
        for (i = 0; i < str.length; i++) {
            if (emoji.URLS[str[i]] != undefined) {
                var output = emoji.of(str[i]);
                var emojiImage = output.url.replace(
                    "assets-cdn.github",
                    "github.githubassets"
                );
                text = text.replace(
                    `:${str[i]}:`,
                    `<img src="${emojiImage}" class="emoji">`
                );
            }
        }
        return text;
    } else {
        return text;
    }
}

request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        let repos = JSON.parse(body);
        
        let data = repos.items.map((value, key) => {
            return {
                name: value.name,
                description: convertToEmoji(value.description),
                lang: value.language,
                stars: value.stargazers_count,
                forks: value.forks_count,
                url: value.html_url
            }
        })

        console.log(data)
      }
});