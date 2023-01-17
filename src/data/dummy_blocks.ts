import { blockData } from "../types/note/block";

export const blocks: { [key: string]: blockData } = {
  '0': {
    blockType: 'text',
    content: 'Root Block! contentttttt',
    properties: {
      creationTime: 12321321,
      modifiedTime: 1232112
    },
    children: [
      '1',
      '2',
      '3',
    ]
  },
  '1': {
    blockType: 'text',
    content: 'Uno',
    properties: {
      creationTime: 12321321,
      modifiedTime: 1232112
    },
    children: [
      '4',
      '5',
      '6',
    ]
  },
  '2': {
    blockType: 'text',
    content: 'Dos',
    properties: {
      creationTime: 12321321,
      modifiedTime: 1232112
    },
    children: [
      '7',
      '8',
    ]
  },
  '3': {
    blockType: 'text',
    content: 'Tres',
    properties: {
      creationTime: 12321321,
      modifiedTime: 1232112
    },
    children: [
      '9'
    ]
  },
  '4': {
    blockType: 'text',
    content: '4: first block',
    properties: {
      creationTime: 12321321,
      modifiedTime: 1232112
    },
    children: [
    ]
  },
  '5': {
    blockType: 'text',
    content: '4: first block',
    properties: {
      creationTime: 12321321,
      modifiedTime: 1232112
    },
    children: [
    ]
  },
  '6': {
    blockType: 'text',
    content: '4: first block',
    properties: {
      creationTime: 12321321,
      modifiedTime: 1232112
    },
    children: [
    ]
  },
  '7': {
    blockType: 'text',
    content: '4: first block',
    properties: {
      creationTime: 12321321,
      modifiedTime: 1232112
    },
    children: [
    ]
  },
  '8': {
    blockType: 'text',
    content: '4: first block',
    properties: {
      creationTime: 12321321,
      modifiedTime: 1232112
    },
    children: [
    ]
  },
  '9': {
    blockType: 'text',
    content: '4: first block',
    properties: {
      creationTime: 12321321,
      modifiedTime: 1232112
    },
    children: [
    ]
  },

}