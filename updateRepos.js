const fs = require("fs");
const path = require('path');
const request = require('request');
const emoji = require("github-emoji");

const options = {
    url: 'https://api.github.com/search/repositories?q=user:allakazan',
    headers: {
      'User-Agent': 'Node Request'
    }
}

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

        const reposDir = '_repositories';

        // Delete all files from the folder
        fs.readdir(reposDir, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(reposDir, file), err => {
                    if (err) throw err;
                });
            }
        });

        //Create .md files
        for (let repo of data)
        {
            fs.open(path.join(reposDir, repo.name+'.md'), 'w', (err, file) => {
                if (err) throw err;

                let content = 
                    '---\n'+
                    `name: ${repo.name}\n`+
                    `description: ${repo.description}\n`+
                    `lang: ${repo.lang}\n`+
                    `stars: ${repo.stars}\n`+
                    `forks: ${repo.forks}\n`+
                    `url: ${repo.url}\n`+
                    '---'

                fs.writeFile(path.join(reposDir, repo.name+'.md'), content.replace('                    ',''), err => {
                    if (err) throw err;
                    
                    console.log(repo.name+' file created in write mode.\n');
                }); 
            }); 
        }
    }
});