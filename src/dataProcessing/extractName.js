function extractName (name) {
  let restOfName;
  let altName; 

  if (!name.includes(' ')) {
    return [null, name];
  }
  if (/(\(.*\)|jr|sr)$/i.test(name)) {
    // for cases like 'Charlotte Brontë (Currer Bell)', 
    // take out (Currer Bell) (altName) for placement in gname, and use Brontë as surname
    // often altName is just an alternate spelling/pronunciation, e.g.
    // "gname": "Marie Alexandrine (d’Assy)","surname":"Daumier-Dassy"
    [_, restOfName, altName] = name.match(/(.*)\s(\(.*\)|(jr|sr))$/i);
    name = restOfName;
  }
  // extracts out given name and surname from single name string
  if (/(v[oa]n|der?|d')\s/i.test(name)) {
    let [_, gname, surname] = name.match(/(.*)\s+(?=v.n|der?|d')(.*)/i);
    if (altName) gname = `${gname} ${altName}`;
    return [gname, surname];
  } else {
    let [_, gname, surname] = name.match(/(.*)\s+([^ ]+)/);
    if (altName) gname = `${gname} ${altName}`;
    return [gname, surname];
  }
}

console.log(extractName('Helena (Leen) Elisabeth Veerman'));
module.exports = extractName;