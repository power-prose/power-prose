export const analyzeText = (spokenText, watchWords) => {
  let regWords = watchWords.map(word => {
    return { word: word, regex: new RegExp(word, "gi") };
  });

  let wordFrequencies = {};
  for (let i = 0; i < regWords.length; i++) {
    let found = spokenText.match(regWords[i].regex);
    //currently only capturing number of times a word was spoken, *not* the snippet/context around it
    if (found) wordFrequencies[found[0].toLowerCase()] = found.length;
  }
  return wordFrequencies;
};

export const dateParser = datetime => {
  let dateArr = datetime.slice(0, datetime.indexOf("T")).split("-");
  let year = dateArr[0];
  let month = dateArr[1];
  let day = dateArr[2];
  return `${month}/${day}/${year}`;
};

export const singleConvoWatchWordsForViz = watchWords => {
  console.log(watchWords);
  return watchWords.map(word => {
    return {
      Word: word.wordOrPhrase,
      Count: word.watchWordOccurrence.countOfTimesUsed
    };
  });
};

export const singleConvoToneForViz = tones => {
  let indexArr = [0,1,2,3,4,5,6]
  let notTones = ["conversationId", "createdAt", "id", "updatedAt"];
  let tonesData = [];
  let i;
  for (let key in tones) {
    if (!notTones.includes(key)) {
      let index = Math.floor(Math.random()*indexArr.length)
      let num = indexArr[index];
      indexArr.splice(index, 1);

      tonesData.push({ tone: key, value: tones[key] * 100, index:  num+1});
      i++
    }

  }
  return tonesData;
};
