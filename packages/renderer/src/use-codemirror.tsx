import { useEffect, useState, useRef } from 'react'
import './editor.css'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, highlightActiveLine } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { history, historyKeymap } from '@codemirror/history'
import { indentOnInput } from '@codemirror/language'
import { bracketMatching } from '@codemirror/matchbrackets'
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter'
import { defaultHighlightStyle, HighlightStyle, tags } from '@codemirror/highlight'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import type React from 'react'
import { oneDarkTheme } from '@codemirror/theme-one-dark'

export const sukkomiTheme = EditorView.theme({
    '&': {
        backgroundColor: '#00000033',
        height: '100%',
        padding: "2px",
        "padding-right": "8px",
        "font-size": "16px",
        color: "white",
        "font-family": "Fira Code",
        "border": "solid " + "2px " + " rgba(128, 128, 128, 0.1)",
    },
    ".cm-gutters": {
        backgroundColor: "#ffccff",
        color: "#000",
        "border-radius": "3px",
        "font-family": "Fira Code"
        
      },
    ".cm-line": {
        background: "transparent",
        border: "none",
        "font-family": "Fira Code"
    },
      ".cm-content": {
        caretColor: "#FFF",
        backgroundColor: "transparent",
        outline: "none",
        overflow: "hidden"
      },
      "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#ffccff30",
        
      }, 
      "&.cm-editor.cm-focused": {
          outline: "none"
      },
})

const syntaxHightlighting = HighlightStyle.define([
    {
        tag: tags.heading1,
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#ffccff',
        "font-family": "Fira Code"
    },
   {
       tag: tags.heading2,
       fontSize: '18px',
       fontWeight: 'bold',
       color: '#cce0ff',
       "font-family": "Fira Code"
   },    
   {
    tag: tags.heading3,
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ffccff',
    "font-family": "Fira Code"
    },
    {
        tag: tags.heading4,
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#cce0ff',
        "font-family": "Fira Code"
    },
    {
        tag: tags.heading5,
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#ffccff',
        "font-family": "Fira Code"
    }

])
interface Props {
    initialDoc: string,
    onChange?: (state: EditorState) => void
}

const useCodeMirror = <T extends Element>(
props: Props
): [React.MutableRefObject<T | null>, EditorView?] => {
    const refContainer = useRef<T>(null)
    const [editorView, setEditorView] = useState<EditorView>()
    const { onChange } = props
    
    useEffect(() => {
        if (!refContainer.current) return
        const startState = EditorState.create({
            doc: props.initialDoc,
            extensions: [
                keymap.of([...defaultKeymap, ...historyKeymap]),
                lineNumbers(),
                highlightActiveLine(),
                history(),
                indentOnInput(),
                bracketMatching(),
                defaultHighlightStyle.fallback,
                highlightActiveLine(),
                markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                    addKeymap: true,
                }),
                sukkomiTheme,
                syntaxHightlighting,
                EditorView.lineWrapping,
                EditorView.updateListener.of(update => {
                    if(update.changes) {
                        onChange && onChange(update.state)
                    }
                })
            ]
        })
        const view = new EditorView({
            state: startState,
            parent: refContainer.current
        })

        setEditorView(view)
    }, [refContainer])
    return [refContainer, editorView]
}

export default useCodeMirror