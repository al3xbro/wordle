import { useEffect, useState } from 'react'
import Game from './components/Game'

export default function App() {

    const [correctWord, setCorrectWord] = useState<string>('')
    const [possibleWords, setPossibleWords] = useState<string[]>([])
    const [error, setError] = useState('')

    async function fetchWords() {
        const res = await fetch('https://raw.githubusercontent.com/tabatkins/wordle-list/main/words')
        return (await res.text()).split(/\s/)
    }

    useEffect(() => {
        fetchWords().then((res) => {
            setPossibleWords(res)
            const solution = res[Math.floor(Math.random() * res.length)]
            setCorrectWord(solution);
            (window as any).cheat = () => { return solution }
        })
    }, [])

    return (
        <>
            <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                {error}
                {possibleWords && correctWord ?
                    <Game correctWord={correctWord} possibleWords={possibleWords} setError={setError} />
                    :
                    <div>loading</div>
                }
            </div>
        </>
    )
}

