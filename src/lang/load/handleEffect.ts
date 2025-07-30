import { formatType } from "../format/index.ts"
import type { Mod } from "../mod/index.ts"
import { interlize, unionlize } from "../normalize/index.ts"
import type { Stmt } from "../stmt/index.ts"
import { subtype, typeEqual } from "../subtype/index.ts"

export async function handleEffect(mod: Mod, stmt: Stmt): Promise<void> {
  if (stmt.kind === "AssertSubtype") {
    if (subtype(stmt.lhs, stmt.rhs)) {
      return
    }

    throw new Error(
      `[assert-subtype] fail:\n` +
        `  lhs: ${formatType(stmt.lhs)}\n` +
        `  rhs: ${formatType(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "AssertNotSubtype") {
    if (!subtype(stmt.lhs, stmt.rhs)) {
      return
    }

    throw new Error(
      `[assert-not-subtype] fail:\n` +
        `  lhs: ${formatType(stmt.lhs)}\n` +
        `  rhs: ${formatType(stmt.rhs)}`,
    )
  }

  if (stmt.kind === "AssertTypeEqual") {
    if (typeEqual(stmt.lhs, stmt.rhs)) {
      return
    }

    throw new Error(
      `[assert-type-equal] fail:\n` +
        `  lhs: ${formatType(stmt.lhs)}\n` +
        `  rhs: ${formatType(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "AssertNotTypeEqual") {
    if (!typeEqual(stmt.lhs, stmt.rhs)) {
      return
    }

    throw new Error(
      `[assert-not-type-equal] fail:\n` +
        `  lhs: ${formatType(stmt.lhs)}\n` +
        `  rhs: ${formatType(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "Unionlize") {
    console.log(formatType(unionlize(stmt.type)))
    return
  }

  if (stmt.kind === "Interlize") {
    console.log(formatType(interlize(stmt.type)))
    return
  }
}
