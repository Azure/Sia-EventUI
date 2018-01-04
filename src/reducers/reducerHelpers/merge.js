export const oneToManyMap = (sourceArray, keySelector) => {
    const keys = sourceArray.map(sourceRecord => keySelector(sourceRecord))
    var oneToManyMapResult = {}
    keys.forEach(currentKey => oneToManyMapResult[currentKey] = sourceArray.filter(sourceRecord => keySelector(sourceRecord) === currentKey))
    return oneToManyMapResult
}

export const mergeOneToManyMaps = (map1, map2) => {
    const allKeys = map1.keys().concat(map2.keys())
    var mergedMap = {}
    allKeys.forEach(key => mergedMap[key] = mergeWithOverwrite(map1[key], map2[key]))
    return mergedMap
}

export const mergeWithOverwrite = (arr1, arr2) => {
    return arr1.filter(arr1Entity => !(arr2.map(arr2Entity => arr2Entity.id).includes(arr1Entity.id))).concat(arr2)
}

export const mergeToStateById = (state, records) => Object.assign(
    {},
    state,
    ...recordsToIdValuePairArray(records)
)

const extractIdValuePair = (record) => ({
    [record.id]: record
})

export const recordsToIdValuePairArray = (records) => records
? Array.isArray(records)
    ? records.map(extractIdValuePair)
    : [extractIdValuePair(records)]
: []

export const withParentId = (parentIdName, parents, fnParentToRecords) => parents
    ? Array.isArray(parents)
        ? parents.map(extractRecordsFromParent(parentIdName, fnParentToRecords))
            .reduce(byConcatenation, [])
        : withParentId(parentIdName, [parents], fnParentToRecords)
    : []

export const extractRecordsFromParent = (parentIdName, fnParentToRecords) => parent => {
    if(!parent) return []
    var records = fnParentToRecords(parent)
    if(!records) return []
    return  Array.isArray(records)
            ? records.map(record => Object.assign({}, record, {[parentIdName]:parent.id}))
            : Object.assign({}, fnParentToRecords(parent), {[parentIdName]:parent.id})
}

export const byConcatenation = (aggregateArray, current) => current
? Array.isArray(current)
    ? aggregateArray.concat(current)
    : [...aggregateArray, current]
: aggregateArray
