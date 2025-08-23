import * as X from "@xieyuheng/x-data.js"
import { recordMap } from "../../utils/record/recordMap.ts"
import * as Types from "../type/index.ts"
import { type Type } from "../type/index.ts"

export function matchType(data: X.Data): Type {
  return X.match(typeMatcher, data)
}

const typeMatcher: X.Matcher<Type> = X.matcherChoice<Type>([
  X.matcher("'anything-t", () => Types.AnythingType()),
  X.matcher("'nothing-t", () => Types.NothingType()),
  X.matcher("'bool-t", () => Types.BoolType()),
  X.matcher("'string-t", () => Types.StringType()),
  X.matcher("'int-t", () => Types.IntType()),
  X.matcher("'float-t", () => Types.FloatType()),

  X.matcher("`(list-t ,type)", ({ type }) => Types.ListType(matchType(type))),

  X.matcher("(cons '-> types)", ({ types }) =>
    X.dataToArray(types)
      .map(matchType)
      .reduceRight((retType, argType) => Types.Arrow(argType, retType)),
  ),

  X.matcher("(cons 'union types)", ({ types }) =>
    Types.Union(X.dataToArray(types).map(matchType)),
  ),

  X.matcher("(cons 'inter types)", ({ types }) =>
    Types.Inter(X.dataToArray(types).map(matchType)),
  ),

  X.matcher("(cons 'tau types)", ({ types }, { data }) =>
    Types.Tau(
      X.dataToArray(types).map(matchType),
      recordMap(X.asTael(data).attributes, matchType),
    ),
  ),

  X.matcher("(cons 'tau* types)", ({ types }, { data, meta }) => {
    const allTypes = X.dataToArray(types).map(matchType)
    if (allTypes.length === 0) {
      let message = `tau* body should not be empty\n`
      throw new X.ParsingError(message, meta)
    }

    const prefixTypes = allTypes.slice(0, allTypes.length - 1)
    const restType = allTypes[allTypes.length - 1]
    return Types.Tau(
      prefixTypes,
      recordMap(X.asTael(data).attributes, matchType),
      restType,
    )
  }),

  X.matcher("name", ({ name }) => Types.TypeVar(X.symbolToString(name))),
])
