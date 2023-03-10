import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { shift_child_order } from '../../hoc/actions';
import { BlockContext } from '../../hoc/BlockProvider';
import { blockData } from '../../types/note/block';
import { get_rand_id } from '../../utils/id_gen';
import { first_line, getLine } from '../../utils/text';
import NewBlockButton from '../NoteBlock/NewBlockButton';
import NoteBlock from '../NoteBlock/NoteBlock';
import NoteBlockMonaco from '../NoteBlock/NoteBlockMonaco';

import classes from './NoteColumn.module.css';



export const NoteColumn = ({ id }: { id: string }) => {
  const [renders, set_renders] = useState(0);
  useEffect(() => {
    set_renders(renders + 1)
  }, [id])
  
  const { state, dispatch } = useContext(BlockContext);
  const blocks = state.blocks
  
  const newBlockHandler = () => {
    const new_id = get_rand_id()
    dispatch({ type: "create", id: new_id, block_data: { content: "untitled", parent: id, blockType: 'text', children: [] } });
  }
  let columnStyles = {} as { [key: string]: string }
  const s = getLine(blocks[id].content, -1)
  if (s) {
    const style = s.split(': ').map((s) => s.trim())
    if (style[0] === 'width') {
      columnStyles[style[0]] = style[1]
    }
  }
  const shift_handler = (dir: "start" | "end") => shift_child_order({state, dispatch}, blocks[id].parent, id, dir)

  return (
    <div className={classes.NoteColumn} style={columnStyles}>
      <Link to={'../' + id}>{blocks[id] ? first_line(blocks[id].content) : 'ERROR'}</Link> {/* //TEMP */}
      <NoteBlockMonaco id={id} key={id} />
      <button onClick={() => shift_handler("start")}>{"<"}</button>
      <button onClick={() => shift_handler("end")}>{">"}</button>
      <strong>———</strong>
      {
        blocks[id]?.children.map(block_id =>
          <NoteBlockMonaco id={block_id} key={block_id} />
        )
      }
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

export const NoteDetachedColumn = () => {

  // const { state, dispatch } = useContext(BlockContext);
  const [tmp_text, set_tmp_text] = useState('rm8vstbw\n0jftsc5v');

  const onChangeHandler = (e: any) => {
    const text: string = e.target.value
    set_tmp_text(text)
  }
  const columnStyles = {'width': '100px'}
  if (tmp_text) {
    columnStyles['width'] = '400px'
  }
  return (
    <div className={classes.NoteColumn} style={columnStyles}>
      {/* <Link to={'../' + id}>{blocks[id] ? first_line(blocks[id].content) : 'ERROR'}</Link> //TEMP */}
      {/* <NoteBlock id={id} key={id} /> */}
      <textarea
        className={classes.ContentInputArea}
        onChange={onChangeHandler}
        value={tmp_text}
      />
      <strong>———</strong>
      {
        tmp_text
        .split('\n')
        .filter(s => s.length === 8)
        .map(block_id =>
          <NoteBlockMonaco id={block_id} key={block_id} />
        )
      }
    </div>
  )

}


export const NoteBaseColumn = ({ id }: { id: string }) => {
  const [renders, set_renders] = useState(0);
  useEffect(() => {
    set_renders(renders + 1)
  }, [id])
  const { state, dispatch, num_fetches } = useContext(BlockContext)
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

  // let BulletList = Object.entries(blocks).map(([k, v]) => (
  //   <li key={k}>
  //     <Link to={'../' + k}>
  //       {
  //         first_line(v.content.substring(0, 20))
  //       }
  //     </Link></li>
  // ))

  const BulletListRecur = ({ block_id, depth }: { block_id: string, depth: number }) => {
    const MAX_DEPTH = 3
    const content = first_line(blocks[block_id].content)
    const child_ids = blocks[block_id].children
    let children_els
    if (depth < MAX_DEPTH -1) {
      children_els = child_ids.map((child_id) => <BulletListRecur key={child_id} block_id={child_id} depth={depth+1} />)
    } else {
      children_els = null
    }
    return (
      <>
        <li key={block_id}>
          <Link to={'../' + block_id}>{content}</Link></li>
        <ul>
          {children_els}
        </ul>
      </>
    )
  }

  // const root_id = Object.keys(blocks).filter(_id => blocks[_id].parent === '')[0]

  return (
    <div className={[classes.NoteColumn, classes.NoteBaseColumn].join(' ')} style={columnStyles}>
      <h3>{first_line(blocks[id].content)}</h3>
      <Link to={'../' + "FDXfAgq4FsRzEVKD2aUj"}>{"[Root]"}</Link> {/* //TEMP */}
      <Link to={'../' + blocks[id].parent}>{"[^ Up]"}</Link> {/* //TEMP */}
      {/* <button onClick={() => navigate(-1)}>{"[< Back]"}</button> //TEMP */}
      <NoteBlockMonaco id={id} key={id} />
      <ul>
        <strong>{`renders: ${renders} | fetches: ${num_fetches}`}</strong>
        <BulletListRecur block_id={id} depth={0}/>

      </ul>
    </div>
  )
}
export default NoteColumn;