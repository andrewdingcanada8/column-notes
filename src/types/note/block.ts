export type blockType = 'text' //| 'title' | 'image' | 'drawing'

export type blockData = {
  blockType: blockType,
  content: string,
  properties?: blockProperties,
  parent: string
  children: string[],
}

export type blockProperties = {
  creationTime: number,
  modifiedTime: number,
  // perhaps latest author? list of authors?
}

//TODO: Union types for incomplete clientside and serverside block properties
// export type serverside_block_data = blockData | blockProperties

// export type notePropsPartial = {
//   content?: string,
//   children?: string[],
//   type?: string,
// }