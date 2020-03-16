const fs = require('fs');
const axios = require('axios');
const letters = require('./letters.json');
// const lookupPersonsLetters = require('./lookup_persons_letters.json');

const getDatePrecision = (datesArr) => {
  let pattern = / (about|or) /;
  // yes...yes... bad code smell from successive ifs, but it's the easiest way to encode different precisions as a TINYINT
  let datePrecision = 0;
    if (datesArr.length === 1 && (!/\s*\d{1,2} /.test(datesArr[0])))
      return 7;
    if (datesArr.length === 1 && !pattern.test(datesArr[0]))
      return 1;
    if (datesArr.length === 1 && pattern.test(datesArr[0]))
      return 2;
    if (datesArr.length === 2 && (!pattern.test(datesArr[0]) && !pattern.test(datesArr[1])))
      return 3;
    if (datesArr.length === 2 && (!pattern.test(datesArr[0]) && pattern.test(datesArr[1])))
      return 4;
    if (datesArr.length === 2 && (pattern.test(datesArr[0]) && !pattern.test(datesArr[1])))
      return 5;
    if (datesArr.length === 2 && (pattern.test(datesArr[0]) && pattern.test(datesArr[1])))
      return 6;
    return 0;
}

const datesByLetter = Object.keys(letters).reduce((datesByLetter, letter) => {
  const date_info = letters[letter].date;
  let dates = date_info.split(' and ');
  if (dates.length > 2) {
    throw new Error(dates);
  }
  let dateMatch = dates[dates.length - 1].match(/\d*\s*\w+\s+\d{4}/);
  let recorded_date = dateMatch ? new Date(dateMatch[0]) : null;
  datesByLetter[letter] = {
    recorded_date: recorded_date,
    date_precision: getDatePrecision(dates),
    date_info: date_info,
    location: letters[letter].location,
    url: letters[letter].url,
    catalogue_code: letter
  };
  return datesByLetter;
}, {});

fs.writeFileSync('letters_for_entry.json', JSON.stringify(Object.values(datesByLetter)))
Object.keys(datesByLetter).map((letter) => datesByLetter[letter].recorded_date);
new Set(Object.keys(letters).map(letter => letters[letter].location));
Object.keys(datesByLetter).reduce((letters,letter) => {
  if (datesByLetter[letter].date_precision === 7) {
    letters.push([letter, datesByLetter[letter].recorded_date]);
  }
  return letters;
}, []);
Object.keys(datesByLetter).filter((letter) => {
  return !datesByLetter[letter].recorded_date;
});

// let persons = Object.keys(lookupPersonsLetters).filter((person) => !(['Vincent van Gogh', 'Theo van Gogh', 'Albert Aurier'].includes(person) || person.startsWith('c/o'))).map((person) => {
//   if (/v[oa]n|de/.test(person)) {
//     let [_, gname, surname] = person.match(/(.*)\s+(?=v.n|de)(.*)/)
//     return {gname, surname, original: person}
//   } else {
//     let [_, gname, surname] = person.match(/(.*)\s([^ ]+)/);
//     return {gname, surname, original: person}
//   }
//   console.log('missed!')
// });
// persons.forEach(person => {
//   if (`${person.gname} ${person.surname}` !== person.original) {
//     throw new Error(`${person.gname} ${person.surname} ${person.original}`);
//   }
//   axios.post('http://localhost:7000/api/v1/persons',{ gname: person.gname, surname: person.surname }).then((res) => {
//     console.log(res);
//   }).catch(e => {
//     throw new Error(e);
//   })
// });
// persons
// persons.forEach((person) => {
//   // axios.post('http://localhost:7000/api/v1/persons', {})
// })





const names = Object.keys(letters).reduce((names, letter) => {
  if (!names[letter]) {
    names[letter] = {to: [], from: [], date_info: '', date: null};
  }
  if (Array.isArray(letters[letter].to)) {
    names[letter].to = names[letter].to.concat(letters[letter].to);
  } else {
    names[letter].to.push(letters[letter].to);
  }
  if (Array.isArray(letters[letter].from)) {
    names[letter].from = names[letter].from.concat(letters[letter].from);
  } else {
    names[letter].from.push(letters[letter].from);
  }
  names.date_info = letters[letter].date;
  const dateMatch = letters[letter].date.match()
  return names;
}, {});

const correspondents = Object.keys(letters).reduce((correspondents, letter) => {
  if (Array.isArray(letters[letter].to)) {
    letters[letter].to.forEach((name) => {
      if (!correspondents[name]) {
        correspondents[name] = {
          to: [],
          from: []
        }
      }
      correspondents[name].to.push(letter)
    });
  }
  else {
    let name = letters[letter].to;
    if (!correspondents[name]) {
      correspondents[name] = {
        to: [],
        from: []
      }
    }
    correspondents[name].to.push(letter);
  }
  if (Array.isArray(letters[letter].from)) {
    letters[letter].from.forEach((name) => {
      if (!correspondents[name]) {
        correspondents[name] = {
          to: [],
          from: []
        }
      }
      correspondents[name].from.push(letter)
    });
  }
  else {
    let name = letters[letter].from;
    if (!correspondents[name]) {
      correspondents[name] = {
        to: [],
        from: []
      }
    }
    correspondents[name].from.push(letter);
  }
  return correspondents;
}, {});


// fs.writeFileSync('./letters_by_.json', JSON.stringify(letter));
// const names = new Set();
// Object.keys(letters).forEach((letter) => {
//   if (Array.isArray(letters[letter].to)) {
//     letters[letter].to.forEach((name) => names.add(name));
//   }
//   else {
//     names.add(letters[letter].to);
//   }
//   if (Array.isArray(letters[letter].from)) {
//     letters[letter].from.forEach((name) => names.add(name));
//   }
//   else {
//     names.add(letters[letter].from);
//   }
// }, []);
// fs.writeFileSync('./letters_new.json', JSON.stringify(letter));