import React from 'react';

import classes from './NewBlockButton.module.css';

const NewBlockButton = ({onClick}: any) => {
  return (
    <button className={classes.NewBlockButton} onClick={onClick}>+</button>
  );
};

export default NewBlockButton;