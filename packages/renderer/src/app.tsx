import React, { useState, useCallback } from 'react'
import './app.css'
import Editor from './Editor'
import Preview from './preview'

const App: React.FC = () => {
    const [doc, setDoc] = useState<string>('# Hello, World!')

    const handleDocChange = useCallback(newDoc => {
        setDoc(newDoc)
    }, [])
    return (
        <div className='app'>
            <Editor onChange={handleDocChange} initialDoc={doc}/>
            <Preview />
        </div>
    )
}

export default App