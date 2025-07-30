import { type Stmt } from "../stmt/index.ts"

export type Mod = {
  url: URL
  stmts: Array<Stmt>
  isFinished?: boolean
}

export function createMod(url: URL): Mod {
  return {
    url,
    stmts: [],
  }
}

export function modResolve(mod: Mod, href: string): URL {
  return new URL(href, mod.url)
}
