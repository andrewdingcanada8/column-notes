// import { BlockContext } from "./ReducerBlockProvider" 
import { block_state } from "../types/note/block"
import { ReducerBlockContext, ReducerBlockProvider } from "./ReducerBlockProvider"
import { FirebaseBlockContext, FirebaseBlockProvider } from "./FirebaseBlockProvider"

// let BlockContext = ReducerBlockContext
// let BlockProvider = ReducerBlockProvider

// const use_firebase = true
// if (use_firebase) {
  // BlockContext = FirebaseBlockContext
  // BlockProvider = FirebaseBlockProvider
// }
const BlockContext = FirebaseBlockContext
const BlockProvider = FirebaseBlockProvider


export { BlockContext, BlockProvider }