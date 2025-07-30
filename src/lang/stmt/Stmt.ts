import { type Type } from "../type/index.ts"

export type Stmt =
  | AssertSubtype
  | AssertNotSubtype
  | AssertTypeEqual
  | AssertNotTypeEqual
  | Unionlize
  | Interlize

export type AssertSubtype = {
  kind: "AssertSubtype"
  lhs: Type
  rhs: Type
}

export type AssertNotSubtype = {
  kind: "AssertNotSubtype"
  lhs: Type
  rhs: Type
}

export type AssertTypeEqual = {
  kind: "AssertTypeEqual"
  lhs: Type
  rhs: Type
}

export type AssertNotTypeEqual = {
  kind: "AssertNotTypeEqual"
  lhs: Type
  rhs: Type
}

export type Unionlize = {
  kind: "Unionlize"
  type: Type
}

export type Interlize = {
  kind: "Interlize"
  type: Type
}

export function AssertSubtype(lhs: Type, rhs: Type): AssertSubtype {
  return {
    kind: "AssertSubtype",
    lhs,
    rhs,
  }
}

export function AssertNotSubtype(lhs: Type, rhs: Type): AssertNotSubtype {
  return {
    kind: "AssertNotSubtype",
    lhs,
    rhs,
  }
}

export function AssertTypeEqual(lhs: Type, rhs: Type): AssertTypeEqual {
  return {
    kind: "AssertTypeEqual",
    lhs,
    rhs,
  }
}

export function AssertNotTypeEqual(lhs: Type, rhs: Type): AssertNotTypeEqual {
  return {
    kind: "AssertNotTypeEqual",
    lhs,
    rhs,
  }
}

export function Unionlize(type: Type): Unionlize {
  return {
    kind: "Unionlize",
    type,
  }
}

export function Interlize(type: Type): Interlize {
  return {
    kind: "Interlize",
    type,
  }
}
