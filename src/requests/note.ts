// import assignToWindow from '../request/helpers'
// import * as assignToWindow from '../request/helpers';
import { assignToWindow } from '../utils/helpers'
import { blockData, block_map } from '../types/note/block'
import { db } from './setup_firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
//TODO: add logic to sync local blockStore with server


//! Not used as of this commit
export const get_blocks = async (user_id: string) => {
  const q = query(collection(db, "blocks"), where("edit_access", "array-contains", user_id));
  const new_blocks: block_map = {};
  const unsub = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc, 'fawe')
      // new_blocks[doc.id] = { ...doc.data(), id: doc.id } as blockData
      new_blocks[doc.id] = doc.data() as blockData
  
        // cities.push(doc.data().name);
    });
    console.log("Current blocks from firebase: ", Object.keys(new_blocks).join(", "));
  });
  await new Promise((resolve) => setTimeout(resolve, 2000));
  unsub()
  console.log(new_blocks)
  
  return new_blocks
}