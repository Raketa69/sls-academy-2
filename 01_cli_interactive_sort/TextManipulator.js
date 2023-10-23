class TextManipulator {

    text
    numbers
    strings

    constructor(text) {
        this.text = text.split(' ')
        this.separateNumbersAndStrings()
    }

    separateNumbersAndStrings() {
        let numbers = [];
        let strings = [];
        this.text.forEach(e => (isNaN(e) ? strings : numbers).push(e));
        this.numbers = numbers.sort((a, b) => Number(a) - Number(b));
        this.strings = strings.sort();
    }

    // 1: Sort words alphabetically
    sortByName() {
        let result = this.strings.sort((a, b) => a - b)
        return result
    }

    // 2: Show digits from the smallest
    sortDigitsFromTheSmallest() {
        let result = this.numbers
        result.sort(function (a, b) {
            return a - b;
        })
        return result
    }

    // 3: Show digits from the biggest
    sortDigitsFromTheBiggest() {
        let result = this.numbers
        result.sort(function (a, b) {
            return b - a;
        })
        return result
    }

    // 4: Display words in ascending order by number of letters in the word
    sortByQuantityOfLetters() {
        let result = this.strings
        result.sort(function (a, b) {
            return a.length - b.length;
        })
        return result
    }

    // 5: Show only unique words
    sortByUniqueWords() {
        let result = new Set(this.strings)
        return result
    }
}

export default TextManipulator;
