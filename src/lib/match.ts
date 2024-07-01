function matchValue(correctWord: string, guessWord: string): string[] {
    let resIdx = [0, 1, 2, 3, 4]
    const res = ['', '', '', '', '']

    for (let i = 0; i < guessWord.length; i++) {
        if (guessWord.charAt(i) == correctWord.charAt(i)) {
            res[resIdx[i]] = 'bg-green-400'
            correctWord = correctWord.slice(0, i) + correctWord.slice(i + 1)
            guessWord = guessWord.slice(0, i) + guessWord.slice(i + 1)
            resIdx = [...resIdx.slice(0, i), ...resIdx.slice(i + 1)]
            i--;
        }
    }

    for (let i = 0; i < guessWord.length; i++) {
        if (correctWord.includes(guessWord.charAt(i))) {
            res[resIdx[i]] = 'bg-yellow-400'
            correctWord = correctWord.replace(guessWord.charAt(i), '')
        }
    }

    return res
}

export { matchValue }