import React, { useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Editor, createEditor } from 'slate'
import { withHistory } from 'slate-history'
// import Button from 'rsuite/lib/Button'
import ButtonToolbar from 'rsuite/lib/ButtonToolbar'
import { useSelector, useDispatch } from 'react-redux'
import { setDescription, getDescription } from '../reducer/buildReducer'
import IconButton from 'rsuite/lib/IconButton'
import Container from 'rsuite/lib/Container'
import ButtonGroup from 'rsuite/lib/ButtonGroup'
import Icon from 'rsuite/lib/Icon'

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

// const LIST_TYPES = ['numbered-list', 'bulleted-list']

const RichTextExample = () => {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const dispatch = useDispatch()

    const handleUpdate = value => {
        dispatch(setDescription(value))
    }

    const value = useSelector(getDescription)

    return (
        <div>
            <p>Enter Build Description</p>
            <Container style={{
                minHeight: 300,
                border: "1px solid #292d33",
                borderRadius: "6px"
            }}>
                <Slate editor={editor} value={value} onChange={handleUpdate}>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <MarkButton format="bold" icon="bold" />
                            <MarkButton format="italic" icon="italic" />
                            <MarkButton format="underline" icon="underline" />
                        </ButtonGroup>
                    </ButtonToolbar>
                    <Container style={{padding: "12px 15px", maxHeight: 678, overflow: "auto"}}>
                        <Editable
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="Enter a description for your build..."
                            spellCheck
                            onKeyDown={event => {
                                for (const hotkey in HOTKEYS) {
                                    if (isHotkey(hotkey, event)) {
                                        event.preventDefault()
                                        const mark = HOTKEYS[hotkey]
                                        toggleMark(editor, mark)
                                    }
                                }
                            }}
                        />
                    </Container>
                </Slate>
            </Container>

        </div>
    )
}

// const toggleBlock = (editor, format) => {
//     const isActive = isBlockActive(editor, format)
//     const isList = LIST_TYPES.includes(format)

//     Transforms.unwrapNodes(editor, {
//         match: n => LIST_TYPES.includes(n.type),
//         split: true,
//     })

//     Transforms.setNodes(editor, {
//         type: isActive ? 'paragraph' : isList ? 'list-item' : format,
//     })

//     if (!isActive && isList) {
//         const block = { type: format, children: [] }
//         Transforms.wrapNodes(editor, block)
//     }
// }

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

// const isBlockActive = (editor, format) => {
//     const [match] = Editor.nodes(editor, {
//         match: n => n.type === format,
//     })

//     return !!match
// }

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        default:
            return <p {...attributes}>{children}</p>
    }
}

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

// const BlockButton = ({ format, icon }) => {
//     const editor = useSlate()
//     return (
//         <Button
//             active={isBlockActive(editor, format)}
//             onMouseDown={event => {
//                 event.preventDefault()
//                 toggleBlock(editor, format)
//             }}
//         >
//             <Icon>{icon}</Icon>
//         </Button>
//     )
// }

const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <IconButton
            appearance="subtle"
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
            icon={<Icon icon={icon} />} />
    )
}

export default RichTextExample