import React, { useEffect, useState, createContext } from 'react';
import { useLoaderData } from "react-router-dom";

import { BlockProvider } from './BlockProvider';
import NoteBoard from '../components/NoteBoard/NoteBoard';

// import classes from './NotePageWrapper.module.css';

const NotePageWrapper = (props: any) => {

  const root_id = (useLoaderData() as string);
  const [notes, setNotes] = useState({});
  const fetchData = () => {

  }
  // createNote({ children: [], content: '', type: '' })

  const syncData = async () => {
    // console.log('synchronizing data...')
    // const res = await axios.get('../data/dummy1.json')
    // console.log(res)
  }
  useEffect(() => {
    // runs when mounted and when rerendered
    syncData()
  })

  return (
    <BlockProvider>
      <NoteBoard root_id={root_id} />
    </BlockProvider>
  );
};

export default NotePageWrapper;