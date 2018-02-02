const watchWords = [
    {
        id: 2,
        wordOrPhrase: "no expert"
    },
    {
        id: 3,
        wordOrPhrase: "Just"
    },
    {
        id: 1,
        wordOrPhrase: "Does that make sense"
    },
    {
        id: 4,
        wordOrPhrase: "Am I making sense"
    },
    {
        id: 5,
        wordOrPhrase: "sorry"
    },
    {
        id: 6,
        wordOrPhrase: "just like to say"
    },
    {
        id: 7,
        wordOrPhrase: "not sure"
    },
    {
        id: 8,
        wordOrPhrase: "just like to ask"
    },
    {
        id: 9,
        wordOrPhrase: "I was wondering"
    }
];

const createAllSnippets = (wordArr, text) => {
    const createSnippetsForOneWord = (word, text) => {
        //1 - find indeces of every word occurrence in the text
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

        //2 - create a snippet at a certain index from the text
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

        //run this function:

        //create an array of all indeces of that word in the text
        // let indexArr = findIndeces(word.wordOrPhrase, text);

        //create an array of all snippets within the text
        let snipArr = findIndeces(
            word.wordOrPhrase.toLowerCase(),
            text.toLowerCase()
        ).map(ind => {
            return {
                watchWordId: word.id,
                word: word.wordOrPhrase,
                text: createSnippet(ind, text)
            };
        });
        console.log("SNIP ARR", snipArr)
        return snipArr;
    };

    let finalArr = [];
    wordArr.forEach(word => {
        console.log("WORD", word);
        let arr = createSnippetsForOneWord(word, text);
        console.log('ARR', arr);
        if (arr.length) finalArr = finalArr.concat(arr);
    });
    return finalArr;
};

let text =
    "i just dont know i told her i wasnt sure about just but i just um not sure what to type just here ill just assume youre right this is just gobbledegook is that how you spell that i just dont know";
let word = "just"; //{wordOrPhrase: 'just', id: '1'}

module.exports = { watchWords, createAllSnippets };
