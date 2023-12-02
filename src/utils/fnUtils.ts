export const sortByDate = (
  arr: any,
  key: string,
  ascending: boolean = false
) => {
  return arr.sort(function (a, b) {
    let x = Date.parse(a[key])
    let y = Date.parse(b[key])
    let compare = x - y
    return ascending ? compare : compare * -1
  })
}
