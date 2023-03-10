import NotePageWrapper from './hoc/NotePageWrapper'
// import {loader as block_loader} from './components/NoteBoard/NoteBoard'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import NodeGraph from './components/NodeGraph/NodeGraph';
import { BlockProvider } from './hoc/BlockProvider';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"FDXfAgq4FsRzEVKD2aUj"} />, //TEMP
    // errorElement: <p>ERROR 404: path doesn't exist.</p>,
    // loader: block_loader,
  },
  {
    path: "/:block_id",
    element: <NotePageWrapper />,
    loader: ({ params }) => (params.block_id as string),
  },
  {
    path: "/graph/:block_id",
    //TEMP user_id
    element: (
      <BlockProvider user_id={"andrew_ding"}>
        <NodeGraph type="radial"/>
      </BlockProvider>
    ),
    loader: ({ params }) => (params.block_id as string),
  },
]);



function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
