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
    ...recordsToLookupObject(records)
)

export const recordKeyValuePair = (record) => ({
    [record.id]: record
})

export const recordsToLookupObject = (records) => records.map(record => recordKeyValuePair(record))

export const withParentId = (parentIdName, parents, fnParentToRecords) => parents
    .map(parent => Array.isArray(fnParentToRecords(parent))
        ? fnParentToRecords(parent).map(record => Object.assign({}, record, {[parentIdName]:parent.id}))
        : Object.assign({}, fnParentToRecords(parent), {[parentIdName]:parent.id})
    ).reduce(byConcatenation, [])
    
    

export const byConcatenation = (aggregateArray, current) => aggregateArray.concat(current)

