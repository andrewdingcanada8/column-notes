import React, { useContext, useEffect, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { BlockContext } from '../../hoc/BlockProvider';
import { get_rand_id } from '../../utils/id_gen';
import { first_line } from '../../utils/text';

import NoteBlock from '../NoteBlock/NoteBlock';
import NewColumnButton from '../NoteColumn/NewColumnButton';
import { NoteBaseColumn, NoteColumn, NoteDetachedColumn } from '../NoteColumn/NoteColumn';
import classes from './NoteBoard.module.css'


// export async function loader(props: any) {
//   return {block_id: props.params.block_id};
// }

const NoteBoard = ({ root_id }: { root_id: string }) => {
  // check for blocks
  const { state, dispatch } = useContext(BlockContext)
  const blocks = state.blocks
  if (!blocks[root_id]) {
    return <p>Error with loading note: {root_id}</p>
  }

  // get columns
  const columnIds = blocks[root_id].children
  const columns = columnIds.map(col_id => <NoteColumn id={col_id} key={col_id} />)

  const new_column_handler = () => {
    const new_id = get_rand_id()
    dispatch({ type: "create", id: new_id, block_data: { content: "untitled", parent: root_id, blockType: 'text', children: [] } });
    // // Add a block to the newly created column as well
    // const new_child_id = get_rand_id()
    // dispatch({ type: "create", id: new_child_id, block_data: { content: "untitled", parent: new_id, blockType: 'text', children: [] } });
  }

  return (
    <div className={classes.NoteBoard}>
      <NoteDetachedColumn /> {/* //TEMP */}
      <NoteBaseColumn id={root_id} />
      {columns}
      <NewColumnButton onClick={new_column_handler} />
    </div>
  )
}

export default NoteBoard;