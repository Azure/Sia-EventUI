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
    return arr1.filter(entry => arr2.contains(entry)).concat(arr2)
}

