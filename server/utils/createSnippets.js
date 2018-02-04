const { UserWatchWord } = require("../db/models");

const findWatchWords = userId => {
  return UserWatchWord.findAll({
    where: {
      userId
    }
  }).then(words => {
    return words.map(word => {
      return { wordOrPhrase: word.wordOrPhrase, id: word.id };
    });
  });
};

const createAllSnippets = (wordArr, text, conversationId) => {
  //********************createSnippetsForOneWord: create all snippets for one watch word
  const createSnippetsForOneWord = (word, text) => {
    //**************INNER HELPERS:
    //1 find indeces of every word occurrence in the text
    const findIndeces = (word, text) => {
      let op = 0;
      let indexArr = [];
      while (op < text.length) {
        let currI = text.indexOf(word, op);
        if (currI > -1) {
          indexArr.push(currI);
          op = currI + 1;
        } else break;
      }
      return indexArr;
    };

    //2 create a snippet at a certain index from the text
    const createSnippet = (index, text) => {
      let start = index - 30;
      if (index <= 30) start = 0;
      else if (index >= text.length - 31) start = text.length - 40;
      let end = index + 30;
      if (start === 0) end = 40;
      if (index >= text.length - 30) end = text.length;
      let snip = text.slice(start, end);

      const obj = { snipText: `...${snip}...`, index: index - start + 3};
      return obj;
    };
    //**************END INNER HELPERS

    //PUT HELPERS TOGETHER: create an array of all snippets within the text
    let snipArr = findIndeces(
      word.wordOrPhrase.toLowerCase(),
      text.toLowerCase()
    ).map(ind => {
      let { snipText, index } = createSnippet(ind, text);
      return {
        userWatchWordId: word.id,
        word: word.wordOrPhrase,
        text: snipText,
        conversationId,
        index
      };
    });
    return snipArr;
  };

  //*************************END createSnippetsForOneWord

  //PUTTING IT ALL TOGETHER:
  let finalArr = [];
  wordArr.forEach(word => {
    let arr = createSnippetsForOneWord(word, text);
    if (arr.length) finalArr = finalArr.concat(arr);
  });

  //RETURN ARRAY OF ALL SNIPPETS
  return finalArr;
};

const createAllSnippetsWithWatchWords = (text, conversationId, userId) => {
  return findWatchWords(userId).then(wordArr => {
    return createAllSnippets(wordArr, text, conversationId);
  });
};

module.exports = { createAllSnippetsWithWatchWords };
