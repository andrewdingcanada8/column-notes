export const assignToWindow = (map) => {
  window.test = window.test | {}
  for (const [key, value] of Object.entries(map)) {
    window.test[key] = value
  }
}