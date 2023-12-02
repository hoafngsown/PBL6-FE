export const getTextBodyPart = (text: string) => {
  switch (text) {
    case "RIGHT_ARM_UPPER_ARM_UPPER_SIDE":
      return "右腕：二の腕（上側）"
    case "RIGHT_ARM_UPPER_ARM_LOWER_SIDE":
      return "右腕：二の腕（下側、肘付近）"
    case "RIGHT_FOOT_CENTRAL_PART_OF_THIGH":
      return "右足：足太もも中央部"
    case "LEFT_ARM_UPPER_ARM_UPPER_SIDE":
      return "左腕：二の腕（上側）"
    case "LEFT_ARM_UPPER_ARM_LOWER_SIDE":
      return "左腕：二の腕（下側、肘付近)"
    case "LEFT_FOOT_CENTRAL_PART_OF_THIGH":
      return "左足：足太もも中央部"
    case "OTHERS":
      return "その他"
  }
}

export const getTextAgeData = (ageNumber: number) => {
  switch (ageNumber) {
    case 1:
      return "早期新生児期（生後1週間以内）の経過"
    case 2:
      return "後期新生児期の経過"
    case 3:
      return "検査の記録"
    case 4:
      return "1か月児健康診査"
    case 5:
      return "3〜4か月児健康診査"
    case 6:
      return "6〜7か月児健康診査"
    case 7:
      return "9〜10か月児健康診査"
    case 8:
      return "1歳児健康診査"
    case 9:
      return "1歳6か月児健康診査"
    case 10:
      return "2歳児健康診査"
    case 11:
      return "3歳児健康診査"
    case 12:
      return "4歳児健康診査"
    case 13:
      return "5歳児健康診査"
    case 14:
      return "6歳児健康診査"
  }
}
