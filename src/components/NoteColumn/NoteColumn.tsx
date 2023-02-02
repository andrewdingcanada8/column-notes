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
  let columnStyles = {} as { [key: string]: string }
  const s = getLine(blocks[id].content, -1)
  if (s) {
    const style = s.split(': ').map((s) => s.trim())
    if (style[0] === 'width') {
      columnStyles[style[0]] = style[1]
    }
  }
  return (
    <div className={classes.NoteColumn} style={columnStyles}>
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
  // const navigate = useNavigate();
  let columnStyles = {} as { [key: string]: string }
  const s = getLine(blocks[id].content, -1)
  if (s) {
    const style = s.split(': ').map((s) => s.trim())
    if (style[0] === 'width') {
      columnStyles[style[0]] = style[1]
    }
  }
    <div className={[classes.NoteColumn, classes.NoteBaseColumn].join(' ')} style={columnStyles}>
      </ul>
    </div>
  )
}
export default NoteColumn;