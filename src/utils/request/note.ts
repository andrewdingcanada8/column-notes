// import assignToWindow from '../request/helpers'
// import * as assignToWindow from '../request/helpers';
import { assignToWindow } from '../request/helpers'
import { noteProps, notePropsPartial } from '../../types/note/noteTypes'

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const createNote = async (props: noteProps) => {
  const noteId = getRandomInt(0, 10 ** 11 - 1)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return noteId
}

export const deleteNote = async (id: string) => { }

//* could attempt another design with sending only diffs of noteProps
export const updateNote = async (id: string, props: noteProps) => { }


assignToWindow({
  createNote,
  deleteNote,
  updateNote,
})