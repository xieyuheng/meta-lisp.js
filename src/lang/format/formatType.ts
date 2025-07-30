import { recordMap } from "../../utils/record/recordMap.ts"
import type { Type } from "../type/index.ts"

export function formatType(type: Type): string {
  switch (type.kind) {
    case "TypeVar": {
      return type.name
    }

    case "AnythingType": {
      return "anything-t"
    }

    case "NothingType": {
      return "nothing-t"
    }

    case "BoolType": {
      return "bool-t"
    }

    case "StringType": {
      return "string-t"
    }

    case "IntType": {
      return "int-t"
    }

    case "FloatType": {
      return "float-t"
    }

    case "ListType": {
      return `(list-t ${formatType(type.elementType)})`
    }

    case "Arrow": {
      const argType = formatType(type.argType)
      const retType = formatType(type.retType)
      return `(-> ${argType} ${retType})`
    }

    case "Union": {
      const candidateTypes = type.candidateTypes.map(formatType)
      return `(union ${candidateTypes.join(" ")})`
    }

    case "Inter": {
      const aspectTypes = type.aspectTypes.map(formatType)
      return `(inter ${aspectTypes.join(" ")})`
    }

    case "Tau": {
      const elementTypes = type.elementTypes.map(formatType)
      const attributeTypes = Object.entries(
        recordMap(type.attributeTypes, formatType),
      ).map(([key, type]) => `:${key} ${type}`)

      if (elementTypes.length === 0) {
        return `(tau ${attributeTypes.join(" ")})`
      }

      if (attributeTypes.length === 0) {
        return `(tau ${elementTypes.join(" ")})`
      }

      return `(tau ${elementTypes.join(" ")} ${attributeTypes.join(" ")})`
    }
  }
}
