import { recordMap } from "../../utils/record/recordMap.ts"
import * as Types from "../type/index.ts"
import { type Type } from "../type/index.ts"

export function unionlize(type: Type): Type {
  if (type.kind === "ListType") {
    return Types.ListType(unionlize(type.elementType))
  }

  if (type.kind === "Arrow") {
    return Types.Arrow(unionlize(type.argType), unionlize(type.retType))
  }

  if (type.kind === "Union") {
    // (union (union)) => (union)
    const candidateTypes = flattenUnion(type.candidateTypes)
    if (candidateTypes.length === 1) return candidateTypes[0]
    return Types.Union(candidateTypes)
  }

  if (type.kind === "Inter") {
    // (inter (inter)) => (inter)
    const aspectTypes = flattenInter(type.aspectTypes)
    if (aspectTypes.length === 1) return aspectTypes[0]
    // (inter (union)) => (union (inter))
    // (inter (union A B C) D E)
    // =>
    // (union (inter A D E)
    //        (inter B D E)
    //        (inter C D E))
    const found = findNextUnion(aspectTypes)
    if (!found) return Types.Inter(aspectTypes)
    return unionlize(
      Types.Union(
        found.target.candidateTypes.map((candidateType) =>
          unionlize(
            Types.Inter([...found.prefix, candidateType, ...found.postfix]),
          ),
        ),
      ),
    )
  }

  if (type.kind === "Tau") {
    // (tau A ...) => (inter (tau A) ...)
    // (tau A B :x C :y D)
    // =>
    // (inter (tau A B)
    //        (tau :x C)
    //        (tau :y D))
    const elementTypes = type.elementTypes.map(unionlize)
    const attributeTypes = recordMap(type.attributeTypes, unionlize)
    const restType = type.restType ? unionlize(type.restType) : undefined
    if (elementTypes.length === 0 && restType === undefined) {
      const aspectTypes = Object.entries(attributeTypes).map(
        ([key, attributeType]) => createSingleAttributeType(key, attributeType),
      )
      if (aspectTypes.length === 1) return aspectTypes[0]
      return unionlize(Types.Inter(aspectTypes))
    } else {
      return Types.Tau(elementTypes, attributeTypes, restType)
    }
  }

  return type
}

function createSingleAttributeType(key: string, attributeType: Type): Type {
  if (attributeType.kind === "Union") {
    // (tau :key (union T)) => (union (tau :key T))
    return Types.Union(
      attributeType.candidateTypes.map((candidateType) =>
        Types.Tau([], { [key]: candidateType }),
      ),
    )
  }

  if (attributeType.kind === "Inter") {
    // (tau :key (inter T)) => (inter (tau :key T))
    return Types.Inter(
      attributeType.aspectTypes.map((aspectType) =>
        Types.Tau([], { [key]: aspectType }),
      ),
    )
  }

  return Types.Tau([], { [key]: attributeType })
}

function flattenUnion(types: Array<Type>): Array<Type> {
  return types.map(unionlize).flatMap((type) => {
    if (type.kind === "Union") return type.candidateTypes
    else return [type]
  })
}

function flattenInter(types: Array<Type>): Array<Type> {
  return types.map(unionlize).flatMap((type) => {
    if (type.kind === "Inter") return type.aspectTypes
    else return [type]
  })
}

type NextUnionResult = {
  prefix: Array<Type>
  target: Types.Union
  postfix: Array<Type>
}

function findNextUnion(types: Array<Type>): undefined | NextUnionResult {
  const prefix = []
  const postfix = []
  let target: Types.Union | undefined = undefined
  for (const type of types) {
    if (!target && type.kind === "Union") {
      target = type
    } else if (!target) {
      prefix.push(type)
    } else {
      postfix.push(type)
    }
  }

  if (target) return { prefix, target, postfix }
  else undefined
}
