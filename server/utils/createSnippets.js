// const { WatchWord } = require('../db/models');
const { UserWatchWord } = require('../db/models');
//find watchwords in db - will need update to userwatchwords model based on userId, so we'll have to give it the req.session.userId or something

// const findWatchWords = () => { // send user.id back here and return UserWatchWords.findAll(where: userId = req.params.userId)
//     let watchWords;
//     return WatchWord.findAll()
//         .then((words) => {
//             return words.map(word => {
//                 return { wordOrPhrase: word.wordOrPhrase, id: word.id }
//             })
//     })
// }




const findWatchWords = (userId) => {
    return UserWatchWord.findAll({
        where: {
            userId
        }
    })
        .then((words) => {
            return words.map(word => {
                return { wordOrPhrase: word.wordOrPhrase, id: word.id }
            })
    })
}


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
                    // console.log('found it at: ', currI)
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
            return `...${snip}...`;
        };
    //**************END INNER HELPERS

    //PUT HELPERS TOGETHER: create an array of all snippets within the text
        let snipArr = findIndeces(
            word.wordOrPhrase.toLowerCase(),
            text.toLowerCase()
        ).map(ind => {
            return {
                userWatchWordId: word.id,
                word: word.wordOrPhrase,
                text: createSnippet(ind, text),
                conversationId
            };
        });
        // console.log("SNIP ARR", snipArr)
        return snipArr;
    };

//*************************END createSnippetsForOneWord

    //PUTTING IT ALL TOGETHER:
    let finalArr = [];
    wordArr.forEach(word => {
        // console.log("WORD", word);
        let arr = createSnippetsForOneWord(word, text);
        // console.log('ARR', arr);
        if (arr.length) finalArr = finalArr.concat(arr);
    });

    //RETURN ARRAY OF ALL SNIPPETS
    return finalArr;
};

const createAllSnippetsWithWatchWords = (text, conversationId, userId) => {
    return findWatchWords(userId)
    .then((wordArr) => {
        console.log("WORD ARR: ", wordArr);
        console.log("TEXT:", text);
        return createAllSnippets(wordArr, text, conversationId);
    })
}


module.exports = { createAllSnippetsWithWatchWords };


//watch words example array:
// const watchWords = [
//     {
//         id: 2,
//         wordOrPhrase: "no expert"
//     },
//     {
//         id: 3,
//         wordOrPhrase: "Just"
//     },
//     {
//         id: 1,
//         wordOrPhrase: "Does that make sense"
//     },
//     {
//         id: 4,
//         wordOrPhrase: "Am I making sense"
//     },
//     {
//         id: 5,
//         wordOrPhrase: "sorry"
//     },
//     {
//         id: 6,
//         wordOrPhrase: "just like to say"
//     },
//     {
//         id: 7,
//         wordOrPhrase: "not sure"
//     },
//     {
//         id: 8,
//         wordOrPhrase: "just like to ask"
//     },
//     {
//         id: 9,
//         wordOrPhrase: "I was wondering"
//     }
// ];
