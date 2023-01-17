import { createContext, ReactNode } from 'react';
import { blockData } from '../types/note/block';
import { blocks } from '../data/dummy_blocks';

export const BlockContext = createContext(blocks);

export const BlockProvider = ({ children }: { children: any }) => (
  <BlockContext.Provider value={blocks}>{children}</BlockContext.Provider>
)

