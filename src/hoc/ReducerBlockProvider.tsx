import { createContext, useEffect, useReducer, useState } from 'react';
import { blockData, block_map, block_state, placeholder_block } from '../types/note/block';
import { blocks } from '../data/dummy_blocks';
// import { get_blocks } from '../requests/note'

// from https://kentcdodds.com/blog/how-to-use-react-context-effectively
// const block_reducer = (blocks: {[key: string]: blockData}, action: {type: string, id?: string, block_data?: blockData}) => {

export const ReducerBlockContext = createContext({ state: { blocks }, dispatch: ({ type, id, block_data }: { type: "create" | "modify" | "delete", id: string, block_data: blockData | Partial<blockData> | undefined }) => { } });

// TODO: fix any here
//* reducers should always have pure output (called twice to make sure)
const block_reducer = (state: any, action: {
  type: "create" | "modify" | "delete",
  id: string,
  block_data: blockData | Partial<blockData> | undefined
}) => {
  try {
    switch (action.type) {
      case 'create': {
        console.log("creating new block...")
        if (!action.block_data) {
          throw new Error("Attempt to create block without providing block_data");
        }

        const parent_id = (action.block_data.parent as string)

        const parent = {
          [parent_id]: {
            ...state.blocks[parent_id],
            children: [...state.blocks[parent_id].children, action.id]
          }
        }

        const new_block = { ...placeholder_block, ...action.block_data }
        return {
          blocks: {
            ...state.blocks,
            ...parent,
            [action.id]: new_block,
          }
        }

      }
      case 'modify': {
        return {
          blocks: {
            ...state.blocks,
            [action.id]: {
              ...blocks[action.id],
              content: action.block_data?.content,
            }
          }
        }
      }
      case 'delete': {
        throw new Error("WARNING: 'delete' has not yet been implemented")
      }
    }
  } catch (e) {
    console.error(e)
    return state
  }
}

export const ReducerBlockProvider = ({ user_id, children }: { user_id: string, children: any }) => {
  const [state, dispatch] = useReducer(block_reducer, { blocks });
  // assignToWindow({ block_dispatch: dispatch })
  return <ReducerBlockContext.Provider value={{ state: (state as block_state), dispatch: dispatch as any }}>{children}</ReducerBlockContext.Provider>
}


// /**
//  * Function for requesting the creation of a new block object
//  * @param props blockData of new block to be created
//  * @returns unique serverside ID for new block
//  */
// export const createBlock = async (props: blockData): Promise<number> => {
//   const noteId = getRandomInt(0, 10 ** 11 - 1)
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return noteId
// }

// export const deleteBlock = async (id: string) => { }

// //* could attempt another design with sending only diffs of blockData
// export const modifyBlock = async (id: string, props: blockData) => { }


// assignToWindow({
//   block_dispatch: value[1],
//   // createBlock,
//   // deleteBlock,
//   // modifyBlock,
// })