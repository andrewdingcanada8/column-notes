import React from 'react';

import classes from './NewColumnButton.module.css';

const NewColumnButton = ({onClick}: any) => {
  return (
    <button className={classes.NewBlockButton} onClick={onClick}>+</button>
  );
};

export default NewColumnButton;