import React, { useEffect, useState, createContext } from 'react';
import { getRandomInt } from '../utils/request/note'
import axios from 'axios';
import { BlockProvider } from './BlockProvider';
import NoteBoard from '../components/NoteBoard/NoteBoard';
// import classes from './NotePageWrapper.module.css';

const NotePageWrapper = (props: any) => {
  const [notes, setNotes] = useState({});
  const [path, setPath] = useState('0');
  const fetchData = () => {

  }
  // createNote({ children: [], content: '', type: '' })

  const syncData = async () => {
    // console.log('synchronizing data...')
    const path = window.location.pathname.slice(1)
    // const res = await axios.get('../data/dummy1.json')
    // console.log(res)
    setPath(path)
  }
  useEffect(() => {
    // runs when mounted and when rerendered
    syncData()
  })

  return (
    <BlockProvider>
      <NoteBoard rootId={path} />
    </BlockProvider>
  );
};

export default NotePageWrapper;