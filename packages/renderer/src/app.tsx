import React, { useState } from 'react'
import './app.css'

const App: React.FC = () => {
    const [count, setCount] = useState(0)

    return (
        <div className='app'>
            <header className='app-header'>
                <p>Hello Vite + React!</p>
                <p>Count is: {count}!</p>
                <p>
                    <button onClick={() => setCount((count) => count + 1)}>
                       click me! 
                    </button>
                </p>
            </header>
        </div>
    )
}

export default App