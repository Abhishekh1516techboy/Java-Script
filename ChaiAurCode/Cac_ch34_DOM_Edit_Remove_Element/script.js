// ------------Create NewElement----------
const addLanguage = (lang) => {
    const li = document.createElement('li'); // create newElement...
    li.innerHTML = `${lang}`; // insert value...
    document.querySelector('.language').appendChild(li); // insert newElement...
};
addLanguage('TypeScript');
addLanguage('springBoot');

// Optimize  way to create Element...
const addOptimizeLang = (lang) => {
    const li = document.createElement('li');// create newElement...
    li.appendChild(document.createTextNode(lang));// insert value...
    document.querySelector('.language').appendChild(li); // insert newElement...
};
addOptimizeLang('java');
addOptimizeLang('C++');

// ------------Edit Element----------
//1st Edit...
const seccondLang = document.querySelector('li:nth-child(2)');
// seccondLang.innerText = 'golang';
const newli = document.createElement('li');
newli.textContent = 'golang';
seccondLang.replaceWith(newli);

//2nd Edit...
const firstLang = document.querySelector('li:first-child');
firstLang.outerHTML = `<li>TypeScript</li>`;

// ---------Remove Element--------
const lastLang = document.querySelector('li:last-child');
lastLang.remove(); // remove c++