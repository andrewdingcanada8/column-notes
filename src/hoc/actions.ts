import { useContext } from "react"
import { blockData, block_state } from "../types/note/block"
import { BlockContext } from "./BlockProvider"


type BlockContextType = {
  state: block_state;
  dispatch: ({ type, id, block_data }: {
    type: "create" | "modify" | "delete";
    id: string;
    block_data: blockData | Partial<blockData> | undefined;
  }) => void;
  num_fetches: number;
}

/**
 * Complex reducer to shift child order in parent's children list.
 * @param parent blockData of parent
 * @param child_id string of target child id
 * @param dir direction of shift
 * @param amount amount to shift by
 * @returns true if operation was successfully written to the Provider reducer
 */
export const shift_child_order = (context: any, parent_id: string, child_id: string, dir: "start" | "end", amount = 1): boolean => {
  const { state, dispatch } = context

  const parent = state.blocks[parent_id]
  const children_list = parent.children
  const tgt_i = children_list.findIndex((v: any) => v === child_id)
  const new_children_list = children_list.filter((v: any) => v !== child_id)

  if (dir === "start") {
    if (tgt_i - amount < 0) {
      return false
    }
    new_children_list.splice(tgt_i - amount, 0, child_id)
  } else {
    if (tgt_i + amount > children_list.length - 1) {
      return false
    }
    new_children_list.splice(tgt_i + amount, 0, child_id)
  }
  dispatch({
    type: "modify",
    id: parent_id,
    block_data: { children: new_children_list }
  })
  return true
}