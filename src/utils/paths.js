const BASE = import.meta.env.BASE_URL

export const img = (path) => {
  if (!path) return path
  if (path.startsWith('http')) return path
  if (path.startsWith(BASE)) return path
  return BASE + path.replace(/^\//, '')
}
