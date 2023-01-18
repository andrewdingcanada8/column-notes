
export const get_rand_id = (length=8, exclude=[]) => {
  let buffer = ''
  const avail = 'abcdefghijklmnopqrstuvwxyz0123456789'
  for (let i=0; i<length; i++) {
    const i = Math.floor(Math.random() * avail.length)
    buffer += avail[i]
  }
  if (buffer.length > length) throw new Error("exception!!!!");
  
  return buffer;
}