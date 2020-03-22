
// * // * // * //
const makeCamelCase = topicTitle => {
  const capitalize = string =>
    string.charAt(0).toUpperCase() + string.slice(1);
  let camelCaseKey = topicTitle.toLowerCase();
  if (topicTitle.split(' ').length > 1) {
    const wordArray = topicTitle.split(' ');
    camelCaseKey = `${wordArray[0].toLowerCase()}${wordArray
      .slice(1)
      .map(word => capitalize(word))
      .join('')}`;
  }
  return camelCaseKey;
};

const text = document.querySelector('.searchterms').lastElementChild.innerText;
let [_, name, birthYear, deathYear, description] = 
  text.match(/(.+)?\s\(.*?(\d{1,4})?-.*?(\d{1,4})?\)\s(.+)?/);
  //  text input is like 'Elodie Breton-De Vigne (1836-1909) wife of Jules Breton'
  //                      (       name         ) ( bY) ( dY) (    description   )
let letterRefCodes;
try {
  const [...letterLIs] = document.querySelector('#searchresult ol').children;
  letterRefCodes = letterLIs.map((letterLI) => {
    return letterLI.querySelector('div').id.match(/\d+/)[0];
  });
} catch(e) {
  letterRefCodes = [];
}
const [gname, surname] = extractName(name);
console.log(birthYear, deathYear);
if (birthYear) {
  [birthYear,] = new Date(birthYear).toISOString().match(/\d{1,4}/); // grab just Date from DateTime
} else {
  birthYear = null;
}
if (deathYear) {
  console.log(new Date(deathYear).toISOString());
  [deathYear,] = new Date(deathYear).toISOString().match(/\d{4}/);
} else {
  deathYear = null;
}
const person = {
  gname,
  surname,
  DOB: birthYear,
  DOD: deathYear,
  description,
  letterRefCodes
}
return person;

// * // * // * //