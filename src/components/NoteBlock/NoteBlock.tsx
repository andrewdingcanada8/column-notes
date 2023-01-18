import React, { memo, useMemo, useContext } from 'react';
import { BlockContext } from '../../hoc/BlockProvider';
import { blockData } from '../../types/note/block';

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
  const {state, dispatch} = useContext(BlockContext)
  const blocks = state.blocks  
  return (
    <div className={classes.NoteBlock} key={id}>
      {/* <textarea className={classes.BlockInput} onChange={changeHandler} value={blocks[id].content} /> */}
      <textarea className={classes.ContentInputArea} onChange={console.log} value={blocks[id].content} />
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