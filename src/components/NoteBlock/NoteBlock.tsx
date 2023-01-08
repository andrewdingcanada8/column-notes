import React, { memo, useMemo } from 'react';
import { noteProps } from '../../types/note/block';
import { getRandomInt } from '../../utils/request/note'

import classes from './NoteBlock.module.css';

const isEqual = (prevProps: noteProps, nextProps: noteProps) => {
  console.log('isEqual')
  return (
    prevProps.children == nextProps.children
    && prevProps.content == nextProps.content
    && prevProps.type == nextProps.type
  )

}
const NoteBlock = (props: noteProps) => {
  const hash = getRandomInt(10000, 99999)
  return useMemo(() => (
    <div className={classes.NoteBlock}>
      {hash + '    ' + props.content}
      {/* {props.children.map(id => {
        
      })}
      <NoteBlock children={}/> */}
    </div>
  ), [props.content]);
};

export default NoteBlock;