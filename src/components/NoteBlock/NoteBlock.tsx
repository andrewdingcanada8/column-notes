import React, { memo, useMemo, useContext, useState, useEffect } from 'react';
import { BlockContext } from '../../hoc/BlockProvider';
import { blockData, placeholder_block } from '../../types/note/block';
import { debounce } from '../../utils/debounce';

import classes from './NoteBlock.module.css';

// const isEqual = (prevProps: noteProps, nextProps: noteProps) => {
//   console.log('isEqual')
//   return (
//     prevProps.children == nextProps.children
//     && prevProps.content == nextProps.content
//     && prevProps.type == nextProps.type
//   )
// }

const NoteBlock = ({ id }: { id: string }) => {
  const { state, dispatch } = useContext(BlockContext)
  const [renders, set_renders] = useState(0)
  const [temp_data, set_temp_data] = useState(placeholder_block as blockData)

  useEffect(() => {
    console.log('render!');
    set_temp_data({ ...state.blocks[id] })
    set_renders(renders + 1)
  }, [state.blocks[id]])

  const blocks = state.blocks

  const debounced_update = React.useCallback(
    debounce((content: string) => {
      dispatch({ type: "modify", id: id, block_data: { content: content }})
    }, 1000), [] //* 1000 ms
  )

  const onChangeHandler = (e: any) => {
    set_temp_data(e.target.value)
    debounced_update(e.target.value)
  }
  return (
    <div className={classes.NoteBlock} key={id}>
      {/* <textarea className={classes.BlockInput} onChange={changeHandler} value={blocks[id].content} /> */}
      <textarea className={classes.ContentInputArea} onChange={onChangeHandler} value={temp_data.content} />
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