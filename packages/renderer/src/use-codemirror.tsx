import { useEffect, useState, useRef } from 'react'
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
        backgroundColor: '#0000001A',
        height: '100%',
        padding: "2px",
        "padding-right": "8px",
        "font-size": "14px",
        color: "white",
        "border-radius": "6px"
    },
    ".cm-gutters": {
        backgroundColor: "#ffccff",
        color: "#000",
        "border-radius": "3px",
        
      },
    ".cm-line": {
        background: "transparent",
        border: "none"
    },
      ".cm-content": {
        caretColor: "#000",
        backgroundColor: "transparent",
        outline: "none"
      },
      "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#ffccff30",
        
      }, 
      "&.cm-editor.cm-focused": {
          outline: "none"
      }
})

const syntaxHightlighting = HighlightStyle.define([
    {
        tag: tags.heading1,
        fontSize: '1.802rem',
        fontWeight: 'bold',
        color: '#ffccff',
    },
   {
       tag: tags.heading2,
       fontSize: '1.602rem',
       fontWeight: 'bold',
       color: '#cce0ff',
   },    
   {
    tag: tags.heading3,
    fontSize: '1.424rem',
    fontWeight: 'bold',
    color: '#ffccff',
    },
    {
        tag: tags.heading4,
        fontSize: '1.266rem',
        fontWeight: 'bold',
        color: '#cce0ff',
    },
    {
        tag: tags.heading5,
        fontSize: '1.125rem',
        fontWeight: 'bold',
        color: '#ffccff',
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