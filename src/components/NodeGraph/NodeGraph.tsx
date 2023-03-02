import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import { useLoaderData, useNavigate } from "react-router-dom";
import { BlockContext } from "../../hoc/BlockProvider";
import { first_line } from "../../utils/text";

// import "./styles.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";

export const NodeGraph = ({ type, root_id }: { type: "vertical" | "radial" | "hierarchical", root_id?: string }) => {

  root_id = root_id || (useLoaderData() as string)

  const { state, dispatch } = useContext(BlockContext)
  const [graph_data, set_graph_data] = useState({ nodes: [], edges: [] })
  const [graph_key, set_graph_key] = useState(0)
  const navigate = useNavigate()
  const block_ids = Object.keys(state.blocks)

  const block_nodes: any = []
  const block_edges: any = []
  const get_spring_length = (children: number, depth: number) => {
    if (depth === 1) {
      return 100 - Math.min(children ** 2, 20000)
    }
    return 100 - Math.min(children ** 2, 10000)
  }

  const rec_traverse = (id: string, depth: number): number => {
    if (!state.blocks[id]) { return 0 }
    const title = first_line(state.blocks[id].content)
    const new_node: any = { id: id, label: title, fixed: false }
    if (depth === 0 || !state.blocks[id].parent) {
      new_node.fixed = true
    }
    let num_children = 0
    state.blocks[id].children.forEach(c_id => {
      num_children += rec_traverse(c_id, depth + 1)
    })
    block_nodes.push(new_node)
    const from = state.blocks[id].parent
    const new_edge: any = { from: from, to: id }
    if (type === "vertical") {
      const length = get_spring_length(num_children, depth)
      new_edge.length = length
    }
    block_edges.push(new_edge)
    return num_children + 1
  }
  rec_traverse(root_id, 0)

  // const options: any = {}
  const options: any = {
    "edges": {
      "smooth": {
        "forceDirection": "none"
      }
    },
  }
  // options.physics = {

  options.physics = {
    "barnesHut": {
      "gravitationalConstant": -26700,
      "centralGravity": 4.75,
      "springLength": 85,
      "springConstant": 1.5,
      "damping": 0.33
    },
    "forceAtlas2Based": {
      "gravitationalConstant": -100,
      "centralGravity": 0.04,
      "springLength": 100,
      "springConstant": 0.615,
      "damping": 0.33
    },
    "minVelocity": 0.75,
  }
  // options.physics.barnesHut.gravitationalConstant = -41500
  options.physics.solver = "forceAtlas2Based",



  
  // options.height = window.innerHeight + ""
  // options.width = window.innerWidth + ""

  options.height = "100%"
  options.width = "100%"

  options.nodes = {
    shape: "dot",
    size: 10,
    color: "#9c7cb9",
  }
  if (type === "vertical") {
    options.physics = {
      "wind": {
        "y": 1,
      },
    }
  } else if (type === "hierarchical") {
    options.layout = {
      hierarchical: {
        direction: "UD",
        sortMethod: "directed",
      },
    }
  }




  const events = {
    select: function (event: any) {
      var { nodes, edges } = event;
      console.log(block_edges.filter((n: any) => n.to === nodes[0])[0])
      if (nodes[0]) {
        navigate("../" + nodes[0])
      }
      console.log(nodes, edges)
    }
  };
  return (
    // <Graph
    //   key={selectGroup}
    //   graph={
    //     {
    //       nodes: graph.nodes.filter(n => n.network === parseInt(selectGroup)),
    //       edges: graph.edges.filter(n => n.network === parseInt(selectGroup)),
    //     }
    //   }
    //   options={options}
    //   events={events}
    <Graph
      key={graph_key}
      graph={
        {
          nodes: block_nodes,
          edges: block_edges,
        }
      }
      options={options}
      events={events}
    // getNetwork={network => {
    //   //  if you want access to vis.js network api you can set the state in a parent component using this property
    // }}
    />
  );
}
export default NodeGraph