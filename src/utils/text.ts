export const first_line = (s: string) => {
  const i = s.indexOf("\n")
  if (i == -1) return s
  return s.substring(0,i) + '...'
}

export function getLine(s: string, i: number) {
  const lines = s.trim().split('\n')

  if (i >= 0) {
    return lines[i]
  } else {
    return lines[lines.length + i]
  }
}