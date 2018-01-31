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

const { WatchWord } = require('../db/models');

const findWatchWords = () => {
    let watchWords;
    return WatchWord.findAll()
        .then((words) => {
            return words.map(word => {
                return { word: word.wordOrPhrase, wordId: word.id }
            })
    })
}


const countWords = (spokenText) => {
    //this returns a promise
    return findWatchWords()
        .then(watchWords => {
            let regWords = watchWords.map(word => {
                return { wordId: word.wordId, word: word.word, regex: new RegExp(word.word, 'gi') };
            })
            let wordFrequencies = {};
            for (let i = 0; i < regWords.length; i++) {
                const wordId = regWords[i].wordId;
                let found = spokenText.match(regWords[i].regex);
                //currently only capturing number of times a word was spoken, *not* the snippet/context around it
                if (found) wordFrequencies[wordId] = found.length;
            }
            return wordFrequencies;
        })
}
module.exports = { countWords };


