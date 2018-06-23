const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require('fs');

export function parseHtml(html) {
  const $ = cheerio.load(html);
  const data = [];

  $('body').find('tr').each(function findTableRows(i, e) {
    const tr = $(this).html();
    const containsStats = tr.length < 500 && tr.length > 100 && tr.includes('Antal') && tr.includes('Betyg');

    if (containsStats) {
      const entry = {
        grades: [],
      };
      const lines = tr.split('\n');
      lines.forEach((line) => {
        const text = $(line).text().split(' ');


        // should be the header
        if (text.length > 3) {
          const joined = text.join();
          entry.course = joined.match(/([A-Z]{4}[0-9]{2})/)[0];
          entry.type = joined.match(/hp([A-Z]{3}[0-9]{1})/)[1];
          entry.date = joined.match(/([0-9]{4}-[0-9]{2}-[0-9]{2})/)[1];
        }

        // pair of grade and count
        if (text.length === 2) {
          const [grade, count] = text;

          entry.grades.push({
            grade,
            count: Number.parseInt(count, 10),
          });
        }
      });

      // console.log(JSON.stringify(entry, null, 4));
      data.push(entry);
    }
  });
  // console.log(JSON.stringify(data, null, 4));
  return data;
}

export function getLocalCourse(course) {
  const html = fs.readFileSync(`./${course}.html`, 'utf-8');
  return parseHtml(html);
}

export async function getRemoveCourse(course) {
  const html = await rp(`http://www4.student.liu.se/tentaresult/?kurskod=${course}&provkod=&datum=&kursnamn=&sort=0&search=S%F6k`);
  return parseHtml(html);
}
