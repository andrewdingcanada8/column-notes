import React, { memo, useContext, useMemo } from 'react';
import { BlockContext } from '../../hoc/BlockProvider';
import { blockData } from '../../types/note/block';
import { getRandomInt } from '../../utils/request/note'
import NoteBlock from '../NoteBlock/NoteBlock';

import classes from './NoteColumn.module.css';



const NoteColumn = ({ id }: { id: string }) => {
  const blocks = useContext(BlockContext)
  // const hash = getRandomInt(10000, 99999)
  return (
    <div className={classes.NoteColumn}>
      {blocks[id].children.map(block_id => {
        
        return <NoteBlock id={block_id} key={block_id}/>
      })}
    </div>
  )

  //TODO: memoized version
//   return useMemo(() => (
//     <div className={classes.NoteColumn}>
//       {hash + '    ' + props.content}
//       {/* {props.children.map(id => {
        
//       })}
//       <NoteColumn children={}/> */}
//     </div>
//   ), [props.content]);
// };
}
export default NoteColumn;