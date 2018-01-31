export const analyzeText = (spokenText, watchWords) => {
  let regWords = watchWords.map(word => {
    return {word: word, regex: new RegExp(word, 'gi')};
  })

  let wordFrequencies = {};
  for (let i = 0; i < regWords.length; i++) {
    let found = spokenText.match(regWords[i].regex);
    //currently only capturing number of times a word was spoken, *not* the snippet/context around it
    if (found) wordFrequencies[found[0].toLowerCase()] = found.length;
  }
  return wordFrequencies;
}
