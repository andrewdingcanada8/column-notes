import React from 'react';
import { noteProps } from '../types/note/block';

import NoteBlock from '../components/NoteBlock/NoteBlock';

// import classes from './NotePage.module.css';

const NotePage = (props: any) => {
  console.log(props.notes)
  const indexes = [0, 1, 2, 3]
  const blocks = indexes.map(i => {
    const noteProps: noteProps = {
      content: props.notes[i],
      children: [],
      type: ''
    }
    console.log('content', props.notes)
    return <NoteBlock {...noteProps}/>
  });

  return (
    <>
      hwy
      {blocks}
      <button onClick={props.onClick}></button>
    </>
  );
};

export default NotePage;