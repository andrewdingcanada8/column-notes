export type blockType = 'text' //| 'title' | 'image' | 'drawing'

export type blockData = {
  blockType: blockType,
  content: string,
  properties: blockProperties,
  children: string[],
}

export type blockProperties = {
  creationTime: number,
  modifiedTime: number,
  // perhaps latest author? list of authors?
}


// export type notePropsPartial = {
//   content?: string,
//   children?: string[],
//   type?: string,
// }