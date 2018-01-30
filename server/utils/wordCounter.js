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
