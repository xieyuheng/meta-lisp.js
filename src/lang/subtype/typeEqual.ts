import { type Type } from "../type/index.ts"
import { subtype } from "./subtype.ts"

export function typeEqual(lhs: Type, rhs: Type): boolean {
  return subtype(lhs, rhs) && subtype(rhs, lhs)
}
