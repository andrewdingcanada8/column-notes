import React, { useEffect, useState, createContext } from 'react';
import { useLoaderData } from "react-router-dom";

// import { BlockProvider } from './BlockProvider';
import { BlockProvider } from './BlockProvider';
import NoteBoard from '../components/NoteBoard/NoteBoard';

// import classes from './NotePageWrapper.module.css';

const NotePageWrapper = (props: any) => {

  const root_id = (useLoaderData() as string);
  const user_id = "andrew_ding"
  return (
    <BlockProvider user_id={user_id}>
      <NoteBoard root_id={root_id} />
    </BlockProvider>
  );
};

export default NotePageWrapper;