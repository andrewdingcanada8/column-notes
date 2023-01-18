import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { BlockContext } from '../../hoc/BlockProvider';
import { blockData } from '../../types/note/block';
import { get_rand_id } from '../../utils/id_gen';
import NewBlockButton from '../NoteBlock/NewBlockButton';
import NoteBlock from '../NoteBlock/NoteBlock';

import classes from './NoteColumn.module.css';



export const NoteColumn = ({ id }: { id: string }) => {
  const [renders, set_renders] = useState(0);
  useEffect(() => {
    set_renders(renders + 1)
  },[id])



  const { state, dispatch } = useContext(BlockContext);
  const blocks = state.blocks
  // console.log(id)
  // console.log(blocks[id])
  // const hash = getRandomInt(10000, 99999)


  const newBlockHandler = () => {
    const new_id = get_rand_id()
    dispatch({ type: "create", id: new_id, block_data: { content: "hey guys, austin here", parent: id , blockType:'text', children:[]} });
  }

  return (
    <div className={classes.NoteColumn}>
      <a href={'http://localhost:5173/' + id}>{blocks[id].content}</a>
      {blocks[id].children.map(block_id => {

        return <NoteBlock id={block_id} key={block_id} />
      })}
      <NewBlockButton onClick={newBlockHandler} />
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

export const NoteBaseColumn = ({ id }: { id: string }) => {
  const { state, dispatch } = useContext(BlockContext)
  const blocks = state.blocks
  return (
    <div className={[classes.NoteColumn, classes.NoteBaseColumn].join(' ')}>
      <a href={'http://localhost:5173/0'}>{"[< Home]"}</a>
      <NoteBlock id={id} key={id} />
      <strong>Children</strong>
      <ul>
        {
          blocks[id].children.map(id =>
            <li key={id}><a href={'http://localhost:5173/' + id}>{blocks[id]?.content}</a></li>
          )
        }
      </ul>
    </div>
  )
}
export default NoteColumn;