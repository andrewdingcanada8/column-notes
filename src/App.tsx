import { createNote, deleteNote, updateNote } from '../src/utils/request/note'
import NotePageWrapper from './hoc/NotePageWrapper'
import SandBox from './components/SandBox/SandBox'
function App() {
  createNote({ children: [], content: '', type: '' })

  return (
    <>
      <NotePageWrapper />
      <SandBox />
    </>
  )
}

export default App
