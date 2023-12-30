import { regex } from "@/libs/validations/regex"
import { OnlyNumberOptions } from "@/types"

export const onlyNumber = (value: string, options: OnlyNumberOptions = {}) => {
  if (!value) return ""
  let result = value.replace(regex.non_digit, "")
  if (options.allowZeroFirst) return result
  result = result.replace(/^(0+)(\d)/, "$2")
  if (typeof options.max === "number") {
    result = Number(result) > options.max ? options.max.toString() : result
  }
  return result
}

export const hidePassword = (password: string) => {
  const split = password.split("")
  return new Array(split.length).fill("*").join("")
}
