const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require('fs');
const cache = require('memory-cache');

/* eslint-disable prefer-destructuring, no-unused-vars */
function parseHtml(html) {
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
            grade: grade === '1' ? 'U' : grade,
            count: Number.parseInt(count, 10),
          });
        }
      });
      data.push(entry);
    }
  });
  return data;
}

function getLocalCourse(course) {
  const html = fs.readFileSync(`./samples/${course}.html`, 'utf-8');
  return html;
}

async function getRemoteCourse(course) {
  const html = await rp(`http://www4.student.liu.se/tentaresult/?kurskod=${course}&provkod=&datum=&kursnamn=&sort=0&search=S%F6k`);
  return html;
}

/**
 * Will check in cache for the requested course.
 * If not in cache, get from LiU course page, parse and save.
 * @param {*} req Requires req.param = courseCode.
 * @param {*} res Responds with JSON formatted data.
 */
async function getCourse(req, res) {
  const { courseCode } = req.params;

  console.log('getting course', courseCode);

  const cached = cache.get(courseCode);

  if (cached) {
    console.log('got from cache');
    res.send(cached);
  } else {
    const html = await getRemoteCourse(courseCode);
    const data = parseHtml(html);
    cache.put(courseCode, data, 86400000);
    console.log('got from internetz');
    res.send(data);
  }
}

module.exports = {
  getCourse,
};
