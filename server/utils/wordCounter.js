// const axios = require('axios');

// const countWords = (spokenText) => {
//     let watchwords;

//     axios.get('/api/watchwords', { proxy: { host: '127.0.0.1', port: 8080 } })
//       .then(res => res.data)
//       .then(words => {
//         watchWords = words.map(word => word.wordOrPhrase)
//       })
//       .catch(er => console.log(err))

//     let regWords = watchWords.map(word => {
//         return { word: word, regex: new RegExp(word, 'gi') };
//     })

//     let wordFrequencies = {};
//     for (let i = 0; i < regWords.length; i++) {
//         let found = spokenText.match(regWords[i].regex);
//         //currently only capturing number of times a word was spoken, *not* the snippet/context around it
//         if (found) wordFrequencies[found[0].toLowerCase()] = found.length;
//     }
//     return wordFrequencies;
// }

// module.exports = { countWords };

const defaultWatchWords = [
    //do database query to get the watch words
    "I'm no expert",
    "just",
    "Does that make sense",
    "like",
    "I'm not sure",
    "sorry"
];
const countWords = (spokenText, watchWords = defaultWatchWords) => {
    let regWords = watchWords.map(word => {
        return { word: word, regex: new RegExp(word, 'gi') };
    })
    let wordFrequencies = {};
    for (let i = 0; i < regWords.length; i++) {
        let found = spokenText.match(regWords[i].regex);
        //currently only capturing number of times a word was spoken, *not* the snippet/context around it
        if (found) wordFrequencies[found[0].toLowerCase()] = found.length;
    }
    return wordFrequencies;
}
module.exports = { countWords };


