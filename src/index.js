import dotenv from 'dotenv'

dotenv.config()

const findVowels = (inputString) => {
  const vowels = ['a', 'i', 'u', 'e', 'o', 'A', 'I', 'U', 'E', 'O']
  const results = inputString.split('').filter(str => vowels.includes(str))
  return results.length
}

export const findVowelsA = (inputString) => {
  const pattern = /[aiueo]/gi
  const result = inputString.match(pattern)
  return result ? result.length : 0
}

export default findVowels
