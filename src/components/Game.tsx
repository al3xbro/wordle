import { useCallback, useEffect, useState } from 'react'
import { matchValue } from '../lib/match'

type Props = {
    correctWord: string
    possibleWords: string[]
    setError: React.Dispatch<React.SetStateAction<string>>
}

export default function Game({ correctWord, possibleWords, setError }: Props) {

    const [guesses, setGuesses] = useState<(string)[]>([])
    const [currGuess, setCurrGuess] = useState<string[]>([])

    const onKeyPress = useCallback((e: KeyboardEvent) => {
        setCurrGuess((prevCurrGuesses) => {
            if (e.key == 'Enter' && prevCurrGuesses.length == 5) {
                // submit currGuess
                if (possibleWords.includes(prevCurrGuesses.join(''))) {
                    if (correctWord == prevCurrGuesses.join('')) {
                        window.removeEventListener('keydown', onKeyPress)
                        setError('you won!!!!')
                    }
                    setGuesses((prevGuesses) => {
                        if (prevGuesses.length >= 6) {
                            // if guesses is full
                            return [...prevGuesses]
                        }
                        // add new guess
                        if (prevGuesses.length == 5) {
                            window.removeEventListener('keydown', onKeyPress)
                            setError('you lost :(')
                        }
                        return [...prevGuesses, prevCurrGuesses.join('')]
                    })
                    return []
                }
                // not a word
                setError('not a word')
                return prevCurrGuesses
            }
            else if (e.key.match(/^([a-z]|[A-Z])$/) && prevCurrGuesses.length < 5) {
                // add letter to currGuess
                return [...prevCurrGuesses, e.key.toLowerCase()]
            } else if (e.key == 'Backspace') {
                return prevCurrGuesses.filter((letter, idx) => {
                    if (idx == prevCurrGuesses.length - 1) {
                        return
                    } else {
                        return letter
                    }
                })
            }
            // not enough letters
            setError('not enough letters')
            return [...prevCurrGuesses]
        })
    }, [correctWord, possibleWords])

    useEffect(() => {
        window.addEventListener('keydown', onKeyPress)
        return () => window.removeEventListener('keydown', onKeyPress)
    }, [onKeyPress])

    return (
        <>
            <div className='flex flex-col gap-2'>
                {guesses.map((guess: string, idx: number) => {
                    const correct = matchValue(correctWord, guess)
                    return <div key={idx} className='flex gap-2'>
                        {
                            guess.split('').map((letter: string, idx: number) => {
                                return <div key={idx} className={`p-2 text-center mx-auto border-2 w-12 h-12 rounded-md font-semibold ${correct[idx]}`}>{letter.toUpperCase()}</div>
                            })
                        }
                    </div>
                })}
                <div className='flex gap-2'>
                    {currGuess.map((letter, idx) => {
                        return <div key={idx} className='p-2 text-center mx-auto border-2 w-12 h-12 rounded-md font-semibold'>{letter.toUpperCase()}</div>
                    })}
                    {Array(5 - currGuess.length).fill(' ').map((letter, idx) => {
                        return <div key={idx} className='p-2 text-center mx-auto border-2 w-12 h-12 rounded-md'>{letter}</div>
                    })}
                </div>
                {Array(5 - guesses.length).fill('     ').map((guess, idx) => {
                    return <div key={idx} className='flex gap-2'>
                        {guess.split('').map((letter: string, idx: number) => {
                            return <div key={idx} className='p-2 text-center mx-auto border-2 w-12 h-12 rounded-md'>{letter}</div>
                        })}
                    </div>
                })}
            </div>
        </>
    )
}

