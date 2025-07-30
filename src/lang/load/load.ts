import { ParsingError } from "@xieyuheng/x-data.js"
import fs from "node:fs"
import { createMod, type Mod } from "../mod/index.ts"
import { parseStmts } from "../parse/index.ts"
import { globalLoadedMods } from "./globalLoadedMods.ts"
import { handleEffect } from "./handleEffect.ts"

export async function load(url: URL): Promise<Mod> {
  const found = globalLoadedMods.get(url.href)
  if (found !== undefined) return found.mod

  const text = await fs.promises.readFile(url.pathname, "utf8")

  try {
    const mod = createMod(url)
    mod.stmts = parseStmts(text)
    globalLoadedMods.set(url.href, { mod, text })
    await run(mod)
    return mod
  } catch (error) {
    if (error instanceof ParsingError) {
      throw new Error(error.report({ text }))
    }

    throw error
  }
}

async function run(mod: Mod): Promise<void> {
  if (mod.isFinished) return

  for (const stmt of mod.stmts) await handleEffect(mod, stmt)

  mod.isFinished = true
}
