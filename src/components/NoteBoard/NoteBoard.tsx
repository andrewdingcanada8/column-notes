import React, { useContext, useEffect, useState } from 'react';
import { BlockContext } from '../../hoc/BlockProvider';

import NoteBlock from '../NoteBlock/NoteBlock';
import { NoteBaseColumn, NoteColumn } from '../NoteColumn/NoteColumn';
import classes from './NoteBoard.module.css'


// export async function loader(props: any) {
//   return {block_id: props.params.block_id};
// }

const NoteBoard = ({ root_id }: { root_id: string }) => {

  // check for blocks
  const { state, dispatch } = useContext(BlockContext)
  const [renders, set_renders] = useState(0)

  useEffect(() => {
    set_renders(renders+1)
  }, [root_id])

  const blocks = state.blocks
  if (!blocks[root_id]) {
    return <p>Error with loading note: {root_id}</p>
  }

  // get columns
  const columnIds = blocks[root_id].children
  const columns = columnIds.map(col_id => <NoteColumn id={col_id} key={col_id} />)


  return (
    <div className={classes.NoteBoard}>
      <ul>
        {Object.keys(blocks).map(e => <li key={e}>{e}</li>)}
      </ul>
      {'renders: ' + renders}
      <NoteBaseColumn id={root_id} />
      {columns}
    </div>
  )
}

export default NoteBoard;