export const SUBDOMAIN_ROUTES = {
  career: '/cv',
  dev: '/projects'
} as const

export type Subdomain = keyof typeof SUBDOMAIN_ROUTES

export function resolveSubdomainPath(path: string, sub?: Subdomain) {
  if (!sub) {
    return path
  }
  const prefix = SUBDOMAIN_ROUTES[sub] ?? '/'
  return path === '/' ? prefix : `${prefix}${path}`
}

export function useCurrentDomainUrl() {
  const localePath = useLocalePath()
  const url = useRequestURL()
  const sub = url.hostname.split('.')[0] as Subdomain | undefined
  return (path: string) => {
    const resolved = resolveSubdomainPath(path, sub)
    return localePath(resolved)
  }
}
