const [...letterLis] = document.querySelector('#searchresult ul').children;
const failures = [];
const letters = letterLis.reduce((acc, li) => {
  try {
    const link = li.querySelector('a');
    const [_, VGMnum, correspondence, location, date] = link.textContent.match(/^(\d+?\w+)\s+([^\.]*?)\.\s+?([^,]*),\s+([^\.]*)/); 
    // pardon the ugly regex necessary to parse the text to grab the four capture groups
    console.assert(li.value = VGMnum);
    if (VGMnum.startsWith('RM')) {
      acc[VGMnum] = {
        url: link.href
      }
      return acc;
    }
    acc[VGMnum] = {
      url: link.href,
      location,
      date
    }
    if (/^to /i.test(correspondence)) {
      acc[VGMnum].from = 'Vincent van Gogh';
      let to = correspondence.match(/^to (.*)/i)[1];
      acc[VGMnum].to = to.replace(',', 'and').split('and').map(val => val.trim());
    } else {
      let [from, to] = correspondence.split('to').map(val => val.trim());
      from = from.replace(',', 'and').split('and').map(val => val.trim());
      acc[VGMnum].from = from;
      to = to.replace(',', 'and').split('and').map(val => val.trim());
      acc[VGMnum].to = to;
    }
    return acc;
  } catch (e) {
    failures.push(li);
    return acc;
  }
}, {});