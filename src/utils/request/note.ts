// import assignToWindow from '../request/helpers'
// import * as assignToWindow from '../request/helpers';
import { assignToWindow } from '../request/helpers'
import { blockData } from '../../types/note/block'

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Function for requesting the creation of a new block object
 * @param props blockData of new block to be created
 * @returns unique serverside ID for new block
 */
export const createBlock = async (props: blockData): Promise<number> => {
  const noteId = getRandomInt(0, 10 ** 11 - 1)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return noteId
}

export const deleteBlock = async (id: string) => { }

//* could attempt another design with sending only diffs of blockData
export const modifyBlock = async (id: string, props: blockData) => { }


assignToWindow({
  createBlock,
  deleteBlock,
  modifyBlock,
})