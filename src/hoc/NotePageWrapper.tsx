import React, { useState } from 'react';
import { getRandomInt } from '../utils/request/note'
import NotePage from './NotePage';
// import classes from './NotePageWrapper.module.css';

const NotePageWrapper = (props: any) => {
  const [text, setText] = useState("");
  const notes = {
    0:'a',
    1:'eeee',
    2:'fff',
    3:text,
  }
  const onClick = () => {
    setText(getRandomInt(1,100) + '')
    console.log(`clicked, new state is ${text}`)
  }
  return (
    <>
      hjh
      <NotePage notes={notes} onClick={onClick}/>
    </>
  );
};

export default NotePageWrapper;