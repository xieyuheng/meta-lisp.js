import { type Type } from "../type/index.ts"
import { emptyCtx } from "./Ctx.ts"
import { subtypeInCtx } from "./subtypeInCtx.ts"

export function subtype(targetType: Type, superType: Type): boolean {
  return subtypeInCtx(emptyCtx(), targetType, superType)
}
