import { createContext, memo, useEffect, useReducer, useState } from 'react';
import { blockData, block_map, block_state, placeholder_block } from '../types/note/block';
import { db } from '../requests/setup_firebase'
import { arrayUnion, collection, doc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';

// from https://kentcdodds.com/blog/how-to-use-react-context-effectively
// const block_reducer = (blocks: {[key: string]: blockData}, action: {type: string, id?: string, block_data?: blockData}) => {

export const FirebaseBlockContext = createContext({ state: ({ blocks: {} } as block_state), dispatch: ({ type, id, block_data }: { type: "create" | "modify" | "delete", id: string, block_data: blockData | Partial<blockData> | undefined }) => { }, num_fetches: 0 as number });


export const FirebaseBlockProvider = ({ user_id, children }: { user_id: string, children: any }) => {
  const [state, set_state] = useState(({ blocks: {} } as block_state))
  const [firebase_fetches, set_firebase_fetches] = useState(0)

  useEffect(() => {
    const q = query(collection(db, "blocks_v2"), where("edit_access", "array-contains", user_id));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const new_blocks: block_map = { ...state.blocks };
      let cnt = 0
      // const changes = querySnapshot.docChanges()

      //TODO: NOT WORKING, but let's get it working
      // cnt += changes.length
      // changes.forEach(change => {
      //   if (change.type === "added") {
      //     new_blocks[change.doc.id] = change.doc.data() as blockData
      //   }
      //   else if (change.type === "modified") {
      //     console.log("Modified", change.doc.data())
      //     new_blocks[change.doc.id] = change.doc.data() as blockData
      //   }
      //   else if (change.type === "removed") {
      //     console.log("removed")
      //     delete new_blocks[change.doc.id]
      //   }
      // });
      // TEMPORARY SOLUTION
      querySnapshot.forEach((doc) => {
        new_blocks[doc.id] = doc.data() as blockData
        cnt +=1
      });
      // TODO: do all docs also show up here or is it only the changed docs?
      // TODO: should we be deleting the stale docs?
      set_state({ blocks: new_blocks })
      set_firebase_fetches(firebase_fetches + cnt)
    });
    return unsub
  }, [user_id])


  const dispatch = ({ type, id, block_data }: {
    type: "create" | "modify" | "delete",
    id: string,
    block_data: blockData | Partial<blockData> | undefined
  }) => {
    try {
      console.log("dispatch received\n", { type, id, block_data })
      switch (type) {
        case 'create':
          console.log("creating new block...")
          console.log({ type, id, block_data })
          if (!block_data) {
            throw new Error("Attempt to create block without providing block_data");
          }

          // create new block
          const new_block = { ...placeholder_block, ...block_data }
          setDoc(doc(db, "blocks_v2", id), new_block);

          const parent_id = (block_data.parent as string)
          // add id to parent children
          updateDoc(doc(db, "blocks_v2", parent_id), {
            children: arrayUnion(id)
          });
          break;
        case 'modify':
          updateDoc(doc(db, "blocks_v2", id), block_data)
          break;
        case 'delete':
          throw new Error("WARNING: 'delete' has not yet been implemented")
      }
    } catch (e) {
      console.error(e)
    }
  }

  // assignToWindow({ block_dispatch: dispatch })
  return <FirebaseBlockContext.Provider value={{ state: (state as block_state), dispatch: dispatch as any, num_fetches: firebase_fetches as number }}>{children}</FirebaseBlockContext.Provider>
}