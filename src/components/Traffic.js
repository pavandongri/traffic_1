import React, { useEffect, useState } from 'react'

const Traffic = () => {
    const [currentSignal, setCurrentSignal] = useState('')
    const [inputValue, setInputValue] = useState(0)
    const [manualColor, setManualColor] = useState('')
    const [times, setTimes] = useState({
        red: 2,
        yellow: 2,
        green: 2
    })

    const states = {
        "red": {
            next: "yellow",
        },
        "yellow": {
            next: "green",
        },
        "green": {
            next: "red",
        }
    }

    useEffect(() => {
        if (!currentSignal) {
            setCurrentSignal('red')
        }
        else {
            setTimeout(() => {
                if (!manualColor) setCurrentSignal(states[currentSignal].next)
            }, times[currentSignal] * 1000)
        }

    }, [currentSignal])

    const increment = (color) => {
        if (!inputValue) return
        setTimes(prev => ({ ...prev, [color]: Number(prev[color]) + Number(inputValue) }))
    }

    const handleManualColorChange = (color) => {
        setManualColor(color)
        if (color) setCurrentSignal(color)
        else setCurrentSignal('red')
    }

    return (
        <div>
            <div className="heading">
                <h1>Traffic Signal</h1>
            </div>

            <div className='container'>
                <div className={`light pred ${currentSignal === 'red' ? 'red' : ''}`} />
                <div className={`light mt-5 pyellow ${currentSignal === 'yellow' ? 'yellow' : ''}`} />
                <div className={`light mt-5  pgreen ${currentSignal === 'green' ? 'green' : ''}`} />
            </div>

            <div className='container'>
                <input type="number" placeholder='enter number' onChange={(e) => { setInputValue(e.target.value) }} />
                <div className='container'>
                    <button onClick={() => { increment('red') }}>red</button>
                    <button onClick={() => { increment('yellow') }}>yellow</button>
                    <button onClick={() => { increment('green') }}>green</button>
                </div>
            </div>


            <div className='container'>
                <button onClick={() => { handleManualColorChange('red') }}>red</button>
                <button onClick={() => { handleManualColorChange('yellow') }}>yellow</button>
                <button onClick={() => { handleManualColorChange('green') }}>green</button>
                <button onClick={() => { handleManualColorChange('') }}>clear</button>

            </div>

        </div>
    )
}

export default Traffic



