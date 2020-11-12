export function getSingle<T>(array: Array<T>): T {
    if (!array || array.length >= 2) {
        throw 'non-single item array passed.'
    }
    return array[0]
}