import React from 'react';
import NodeGraph from './NodeGraph';

import classes from './NodeGraphColumn.module.css';

const NodeGraphColumn = (props: any) => {
  return (
    <div className={classes.NodeGraphColumn}>
      <NodeGraph type='radial' {...props} />
    </div>
  );
};

export default NodeGraphColumn;