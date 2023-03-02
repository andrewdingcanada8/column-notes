import React, { memo, useMemo, useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BlockContext } from '../../hoc/BlockProvider';
import { blockData, placeholder_block } from '../../types/note/block';
import { debounce } from '../../utils/debounce';
import { first_line } from '../../utils/text';

import classes from './NoteBlock.module.css';

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

  //TODO: right now it only saves cursor position when changing text, but we need it to also change based on cursor movement
  //TODO: wouldn't it be better to just save the cursor position before serverside update and to then restore it afterwards?
  useEffect(() => {
    set_local_block_data({ ...state.blocks[id] })
    set_renders(renders + 1)
    textAreaRef.current?.setSelectionRange(cursor, cursor);
  }, [state.blocks[id]])

  const debounced_update = React.useCallback(
    debounce((content: string) => {
      console.log("saving via Firebase..")
      dispatch({ type: "modify", id: id, block_data: { content: content } })
    }, 500), [] //* 500 ms
  )



  // TEMP code to automatically readjust height
  // https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.current.style.height = scrollHeight + "px";
      textAreaRef.current.setSelectionRange(cursor, cursor);
    }
  }, [textAreaRef.current, local_block_data.content]);

  // // TEMP code to reduce cursor jump by saving position
  // useEffect(() => {
  //   const input = textAreaRef.current;
  //   if (input) input.setSelectionRange(cursor, cursor);
  // }, [textAreaRef, cursor, local_block_data.content]);


  const onChangeHandler = (e: any) => {
    set_local_block_data({
      ...local_block_data,
      content: e.target.value
    })
    set_cursor(e.target.selectionStart);
    debounced_update(e.target.value)
  }
  return (
    <div className={classes.NoteBlock} key={id}>
      {/* <textarea className={classes.BlockInput} onChange={changeHandler} value={blocks[id].content} /> */}
      <textarea
        className={classes.ContentInputArea}
        onChange={onChangeHandler}
        onSelect={onChangeHandler} //TEMP
        value={local_block_data.content}
        ref={textAreaRef}
      />
      <Link to={'../' + id}>{"[>]"}</Link>
    </div>
  )

  // TODO: finish memoized version
  // const hash = getRandomInt(10000, 99999)
  // return useMemo(() => (
  //   <div className={classes.NoteBlock}>
  //     {hash + '    ' + props.content}
  //     {/* {props.children.map(id => {

  //     })}
  //     <NoteBlock children={}/> */}
  //   </div>
  // ), [props.content]);
};

export default NoteBlock;