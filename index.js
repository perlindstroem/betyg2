const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require('fs');

function parseHtml(html) {
    const $ = cheerio.load(html);
    let count = 0;
    let data = [];

    const tables = $('body').find('tr').each(
        function (i, e) {
            let html = $(this).html();
            let containsStats = html.length < 500 && html.length > 100 && html.includes('Antal') && html.includes('Betyg');

            if (containsStats) {
                let entry = {
                    grades: []
                }
                let lines = html.split('\n');
                lines.forEach(line => {
                    let text = $(line).text().split(' ');

                    
                    // should be the header
                    if (text.length > 3) {
                        let joined = text.join();
                        //console.log(text.join())
                        //console.log(text.join().match(/([A-Z]{4}[0-9]{2})/)[0])
                        //console.log(text.join().match(/hp([A-Z]{3}[0-9]{1})/)[1])
                        entry.course = joined.match(/([A-Z]{4}[0-9]{2})/)[0]
                        entry.type = joined.match(/hp([A-Z]{3}[0-9]{1})/)[1]
                        entry.date = joined.match(/([0-9]{4}-[0-9]{2}-[0-9]{2})/)[1]
                    }
                    
                    // pair of grade and count
                    if (text.length == 2) {
                        entry.grades.push({
                            grade: text[0],
                            count: text[1]
                        })
                    }
                })

                console.log(JSON.stringify(entry, null, 4));
                data.push(entry)
                count = count + 1;
            }
        }
    )
    //console.log(JSON.stringify(data, null, 4));
    return data;
}

//let course = 'TSKS06'
//rp('http://www4.student.liu.se/tentaresult/?kurskod='+course+'&provkod=&datum=&kursnamn=&sort=0&search=S%F6k').then(parseHtml);


const html = fs.readFileSync('./TSKS06.html', 'utf-8');
const data = parseHtml(html)

const sum = data.reduce((acc, exam) => {
    exam.grades.forEach(entry => {
        acc[entry.grade] = (acc[entry.grade] || 0) + Number.parseInt(entry.count);
    })
    return acc;
}, {})

console.log(sum)
