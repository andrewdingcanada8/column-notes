import React, { useContext } from 'react';
import { BlockContext } from '../../hoc/BlockProvider';

import NoteBlock from '../NoteBlock/NoteBlock';
import NoteColumn from '../NoteColumn/NoteColumn';
import classes from './NoteBoard.module.css'

const NoteBoard = ({ rootId }: { rootId: string }) => {

  // check for blocks
  const blocks = useContext(BlockContext)
  if (!blocks[rootId]) {
    return <p>Error with loading note: {rootId}</p>
  }
  
  // get columns
  const columnIds = blocks[rootId].children
  const columns = columnIds.map(col_id => <NoteColumn id={col_id} key={col_id}/>)
  
  
  console.log({blocks})
  console.log({columnIds})

  return (
    <div className={classes.NoteBoard}>
      {columns}
    </div>
  )
  // const blocks = indexes.map(i => {
  //   const noteProps: noteProps = {
  //     content: notes[i],
  //     children: [],
  //     type: ''
  //   }
  //   console.log('content', props.notes)
  //   return <NoteBlock {...noteProps}/>
  // });

  // return (
  //   <>
  //     hwy
  //     {blocks}
  //     <button onClick={props.onClick}></button>
  //   </>
  // );
};

export default NoteBoard;