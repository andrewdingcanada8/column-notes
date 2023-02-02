export type blockType = 'text' //| 'title' | 'image' | 'drawing'

export type blockData = {
  blockType: blockType,
  content: string,
  properties?: blockProperties,
  parent: string
  children: string[],
  // TODO: add:
  edit_access: string[],
  // view_access: string[],
  // owner_access: string[],
}


export type blockProperties = {
  creationTime: number,
  modifiedTime: number,
  // perhaps latest author? list of authors?
}

export type block_map = {[key: string]: blockData}

export type block_state = { blocks: block_map }

export const placeholder_block: blockData = {
  blockType: 'text',
  content: '',
  parent: '0',
  children: [],
  edit_access: ["andrew_ding"], //TEMP
}

//TODO: Union types for incomplete clientside and serverside block properties
// export type serverside_block_data = blockData | blockProperties

// export type notePropsPartial = {
//   content?: string,
//   children?: string[],
//   type?: string,
// }