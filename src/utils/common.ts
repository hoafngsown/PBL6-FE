import { regex } from "@/libs/validations/regex"
import { OnlyNumberOptions } from "@/types"

export const isMaxLength = (value: string) => value?.length >= 256
export const isFullSizeCharacter = (value: string) =>
  regex.full_size_character.test(value)
export const isVietnameseCharacter = (value: string) =>
  regex.vietnamese_character.test(value)
export const isCorrectEmailFormat = (value: string) => regex.email.test(value)
export const isSpecialCharacter = (value: string) =>
  regex.sepicial_character.test(value)

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

export const debounce = (ref: any, callback: any, time: number) => {
  if (ref.current) clearTimeout(ref.current)

  ref.current = setTimeout(() => {
    callback()
  }, time)
}

export const hidePassword = (password: string) => {
  const split = password.split("")
  return new Array(split.length).fill("*").join("")
}
