const axios = require('axios');

const lettersRefPersons = require('./letters_ref_persons.json');

for (let person of lettersRefPersons) {
  const formattedPerson = {
    gname: person.gname,
    surname: person.surname,
    description: person.description,
    ref_person_id: person.personID,
    DOB: person.DOB,
    DOD: person.DOD
  }
  if (person.DOB !== null) {
    formattedPerson.DOB = `${person.DOB}-00-00`;
  }
  if (person.DOD !== null) {
    formattedPerson.DOD = `${person.DOD}-00-00`;
  }
  if (person.id) {
    axios.put(`http://localhost:7000/api/v1/persons/${person.id}`, formattedPerson).then((res) => {

    });
  } else {
    axios.post('http://localhost:7000/api/v1/persons', formattedPerson);
  }
}

// lettersRefPersons.sort((a, b) => b.letterRefCodes.length - a.letterRefCodes.length);

// console.log(lettersRefPersons.filter((person) => person.id));

// axios.get('http://localhost:7000/api/v1/persons').then((res) => {
//   console.log(res.data);
// }).catch(e => {throw new Error(e)});
// console.log(lettersRefPersons.slice(0, 10));

// const [...letterLis] = document.querySelector('#searchresult ul').children;
// const failures = [];
// const letters = letterLis.reduce((acc, li) => {
//   try {
//     const link = li.querySelector('a');
//     const [_, VGMnum, correspondence, location, date] = link.textContent.match(/^(\d+?\w+)\s+([^\.]*?)\.\s+?([^,]*),\s+([^\.]*)/); 
//     // pardon the ugly regex necessary to parse the text to grab the four capture groups
//     console.assert(li.value = VGMnum);
//     if (VGMnum.startsWith('RM')) {
//       acc[VGMnum] = {
//         url: link.href
//       }
//       return acc;
//     }
//     acc[VGMnum] = {
//       url: link.href,
//       location,
//       date
//     }
//     if (/^to /i.test(correspondence)) {
//       acc[VGMnum].from = 'Vincent van Gogh';
//       let to = correspondence.match(/^to (.*)/i)[1];
//       acc[VGMnum].to = to.replace(',', 'and').split('and').map(val => val.trim());
//     } else {
//       let [from, to] = correspondence.split('to').map(val => val.trim());
//       from = from.replace(',', 'and').split('and').map(val => val.trim());
//       acc[VGMnum].from = from;
//       to = to.replace(',', 'and').split('and').map(val => val.trim());
//       acc[VGMnum].to = to;
//     }
//     return acc;
//   } catch (e) {
//     failures.push(li);
//     return acc;
//   }
// }, {});