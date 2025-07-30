export type Type =
  | TypeVar
  | AnythingType
  | NothingType
  | BoolType
  | StringType
  | IntType
  | FloatType
  | ListType
  | Arrow
  | Union
  | Inter
  | Tau

export type TypeVar = { kind: "TypeVar"; name: string }
export type AnythingType = { kind: "AnythingType" }
export type NothingType = { kind: "NothingType" }
export type BoolType = { kind: "BoolType" }
export type StringType = { kind: "StringType" }
export type IntType = { kind: "IntType" }
export type FloatType = { kind: "FloatType" }
export type ListType = { kind: "ListType"; elementType: Type }
export type Arrow = { kind: "Arrow"; argType: Type; retType: Type }
export type Union = { kind: "Union"; candidateTypes: Array<Type> }
export type Inter = { kind: "Inter"; aspectTypes: Array<Type> }
export type Tau = {
  kind: "Tau"
  elementTypes: Array<Type>
  attributeTypes: Record<string, Type>
  restType?: Type
}

export function TypeVar(name: string): TypeVar {
  return { kind: "TypeVar", name }
}

export function AnythingType(): AnythingType {
  return { kind: "AnythingType" }
}

export function NothingType(): NothingType {
  return { kind: "NothingType" }
}

export function BoolType(): BoolType {
  return { kind: "BoolType" }
}

export function StringType(): StringType {
  return { kind: "StringType" }
}

export function IntType(): IntType {
  return { kind: "IntType" }
}

export function FloatType(): FloatType {
  return { kind: "FloatType" }
}

export function ListType(elementType: Type): ListType {
  return { kind: "ListType", elementType }
}

export function Arrow(argType: Type, retType: Type): Arrow {
  return { kind: "Arrow", argType, retType }
}

export function Union(candidateTypes: Array<Type>): Union {
  return { kind: "Union", candidateTypes }
}

export function Inter(aspectTypes: Array<Type>): Inter {
  return { kind: "Inter", aspectTypes }
}

export function Tau(
  elementTypes: Array<Type>,
  attributeTypes: Record<string, Type>,
  restType?: Type,
): Tau {
  return {
    kind: "Tau",
    elementTypes,
    attributeTypes,
    restType,
  }
}
