const { WatchWord } = require('../db/models');

const findWatchWords = () => { // send user.id back here and return UserWatchWords.findAll(where: userId = req.params.userId)
    let watchWords;
    return WatchWord.findAll()
        .then((words) => {
            return words.map(word => {
                return { word: word.wordOrPhrase, wordId: word.id }
            })
    })
}


const countWords = (spokenText) => {
    // this returns a promise
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
