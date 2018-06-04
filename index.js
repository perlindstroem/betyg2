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
                let date = null;
                let grades = [];
                let lines = html.split('\n');
                lines.forEach(line => {
                    let text = $(line).text().split(' ');

                    // should be the header
                    if (text.length > 3) {
                        date = text.join().slice(-10)
                    }

                    // pair of grade and count
                    if (text.length == 2) {
                        grades.push({
                            grade: text[0],
                            count: text[1]
                        })
                    }
                })

                let entry = {
                    date,
                    grades,
                }
                data.push(entry)
                count = count + 1;
            }
        }
    )

    return data;
}

//let course = 'TATA42'
//rp('http://www4.student.liu.se/tentaresult/?kurskod='+course+'&provkod=&datum=&kursnamn=&sort=0&search=S%F6k').then(parseHtml);

const html = fs.readFileSync('./test.html', 'utf-8');
const data = parseHtml(html)

const sum = data.reduce((acc, exam) => {
    exam.grades.forEach(entry => {
        acc[entry.grade] = (acc[entry.grade] || 0) + Number.parseInt(entry.count);
    })
    return acc;
}, {})

console.log(sum)