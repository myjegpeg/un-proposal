export function getStorage<T = unknown>(key: string) {
  const data = window.localStorage.getItem(`un-proposal:${key}`)

  return data ? (JSON.parse(data) as T) : undefined
}

export function setStorage<T = unknown>(key: string, value: T) {
  const data = JSON.stringify(value)

  window.localStorage.setItem(`un-proposal:${key}`, data)
}

export const storageHandler = {
  getStorage,
  setStorage,
}
