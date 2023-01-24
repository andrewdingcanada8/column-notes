import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
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
    dispatch({ type: "create", id: new_id, block_data: { content: "untitled", parent: id , blockType:'text', children:[]} });
  }

  return (
    <div className={classes.NoteColumn}>
      <Link to={'../'+id}>{blocks[id].content}</Link>
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
      <Link to={'../'+"0"}>{"[< Back]"}</Link>
      <NoteBlock id={id} key={id} />
      <strong>Children</strong>
      <ul>
        {
          blocks[id].children.map(id =>
            <li key={id}><Link to={'../'+id}>{blocks[id]?.content}</Link></li>
          )
        }
      </ul>
    </div>
  )
}
export default NoteColumn;