import React, { memo, useMemo, useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BlockContext } from '../../hoc/BlockProvider';
import { blockData, placeholder_block } from '../../types/note/block';
import { debounce } from '../../utils/debounce';
import { first_line } from '../../utils/text';
import Editor from "@monaco-editor/react";
// import { editor } from 'monaco-editor';
import classes from './NoteBlock.module.css';
import * as MonacoMarkdown from 'monaco-markdown'
import { shift_child_order } from '../../hoc/actions';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';

// const isEqual = (prevProps: noteProps, nextProps: noteProps) => {
//   console.log('isEqual')
//   return (
//     prevProps.children == nextProps.children
//     && prevProps.content == nextProps.content
//     && prevProps.type == nextProps.type
//   )
// }

//TODO: try implementing this: https://stackoverflow.com/questions/46000544/react-controlled-input-cursor-jumps
const NoteBlock = ({ id }: { id: string }) => {
  const { state, dispatch } = useContext(BlockContext)
  const [renders, set_renders] = useState(0)
  const [local_block_data, set_local_block_data] = useState(placeholder_block as blockData)
  const [cursor, set_cursor] = useState(null);
  const [editor_height, set_editor_height] = useState(100);
  const editorRef = useRef(null as editor.IStandaloneCodeEditor | null);

  //TODO: right now it only saves cursor position when changing text, but we need it to also change based on cursor movement
  //TODO: wouldn't it be better to just save the cursor position before serverside update and to then restore it afterwards?
  useEffect(() => {
    set_local_block_data({ ...state.blocks[id] })
    set_renders(renders + 1)
    // textAreaRef.current?.setSelectionRange(cursor, cursor);
  }, [state.blocks[id]])

  const debounced_update = React.useCallback(
    debounce((content: string) => {
      console.log("saving via Firebase..")
      dispatch({ type: "modify", id: id, block_data: { content: content } })
    }, 5000), [] //* 500 ms
  )
  useEffect(() => {
    if (editorRef?.current) {
      set_editor_height((editorRef.current).getContentHeight() || 100)
    }
  }, [editorRef.current, local_block_data.content])


  // // TEMP code to automatically readjust height
  // // https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848
  // const textAreaRef = useRef<HTMLTextAreaElement>(null);
  // useEffect(() => {
  //   if (textAreaRef.current) {
  //     // We need to reset the height momentarily to get the correct scrollHeight for the textarea
  //     textAreaRef.current.style.height = "0px";
  //     const scrollHeight = textAreaRef.current.scrollHeight;

  //     // We then set the height directly, outside of the render loop
  //     // Trying to set this with state or a ref will product an incorrect value.
  //     textAreaRef.current.style.height = scrollHeight + "px";
  //     textAreaRef.current.setSelectionRange(cursor, cursor);
  //   }
  // }, [textAreaRef.current, local_block_data.content]);


  const onChangeHandler = (val: string) => {
    set_local_block_data({
      ...local_block_data,
      content: val
    })
    // set_cursor(e.target.selectionStart);
    debounced_update(val)
  }
  // const text = `function hello() {
  //   alert('Hello world!');
  // }`;

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: any) {
    editor.getModel()?.updateOptions({ tabSize: 2 })
    var extension = new MonacoMarkdown.MonacoMarkdownExtension()
    extension.activate(editor as any)
    set_editor_height(editor.getContentHeight() || 100)

    editorRef.current = editor as any;
    //TODO: broken as causes rerender cycle
    // console.log("editor:", editorRef.current)
    // const new_height = editorRef.current.getModel().getLineCount() * 19
    // set_editor_height(new_height + 10);

  }






  // editorRef?.current?.onDidChangeModelDecorations(() => {
  //   // console.log("changing model height")
  //   updateEditorHeight() // typing
  //   requestAnimationFrame(updateEditorHeight) // folding
  // })

  // let prevHeight = 0

  // const updateEditorHeight = () => {
  //   if (!editorRef?.current) return
  //   const editorElement = editorRef?.current?.getDomNode()

  //   if (!editorElement) {
  //     return
  //   }

  //   const lineHeight = editorRef?.current?.getOption(editorRef?.current?.EditorOption.lineHeight)
  //   const lineCount = editorRef?.current?.getModel()?.getLineCount() || 1
  //   const height = editorRef?.current?.getTopForLineNumber(lineCount + 1) + lineHeight

  //   if (prevHeight !== height) {
  //     prevHeight = height
  //     editorElement.style.height = `${height}px`
  //     editorRef?.current?.layout()
  //   }
  // }
  type IContentSizeChangedEvent = {
    contentHeight: number,
    contentHeightChanged: boolean,
    contentWidth: number,
    contentWidthChanged: boolean,

  }
  editorRef?.current?.onDidContentSizeChange((e: IContentSizeChangedEvent) => {
    if (e.contentHeightChanged) {
      set_editor_height(e.contentHeight)
    }
  })

  // useEffect(() => {
  //   if (!editorRef?.current) return
  //   // console.log(editorRef.current.getContentHeight())
  //   const height = editorRef.current.getContentHeight()
  //   console.log(height)
  //   set_editor_height(height)
  // },[editorRef.current, local_block_data.content])




  // var extension = new MonacoMarkdown.MonacoMarkdownExtension()
  // extension.activate(editorRef?.current.getModel() as any)




  const shift_handler = (dir: "start" | "end") => shift_child_order({ state, dispatch }, state.blocks[id].parent, id, dir)

  return (
    <div className={classes.NoteBlock} key={id}>
      <Editor
        height={editor_height + "px"}
        defaultLanguage="markdown-math"
        defaultValue={""}
        value={local_block_data.content}
        options={{
          fontSize: 13,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          wrappingStrategy: 'advanced',
          minimap: {
            enabled: false
          },
          overviewRulerLanes: 0,
          lineNumbers: 'off',
          glyphMargin: false,
          folding: false,
          // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          // see https://github.com/microsoft/monaco-editor/issues/2007
          scrollbar: {
            alwaysConsumeMouseWheel: false, // defaults is true, false enables the behavior you describe
          },
          renderLineHighlight: "none",
        }}
        onMount={(editor, monaco) => handleEditorDidMount(editor, monaco)}
        // overrideServices={{
        //   onDidChangeModelDecorations: () => console.log("HIt")
        // }}
        onChange={(val: any, ev: any) => {
          // console.log(val, ev)
          onChangeHandler(val)

          // const new_height = editorRef.current.getModel().getLineCount() * 19
          // console.log(editorRef?.current?.getContentHeight())
          // set_editor_height(new_height + 10);
        }}
      // overrideServices ={}
      // options={{
      //   automaticLayout: true
      // }}
      />
      <div className={classes.BottomButtons}>
        <div>
          <button onClick={() => shift_handler("end")}>{"v"}</button>
          <button onClick={() => shift_handler("start")}>{"^"}</button>
        </div>
        <Link to={'../' + id}>{"[>]"}</Link>
      </div>
    </div>
  )
};

export default NoteBlock;