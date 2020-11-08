import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.SAMPLE)

const main = () => {
  return 'Hello Jest!!'
}

export default main
