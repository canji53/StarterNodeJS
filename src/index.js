import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.SAMPLE)

const hello = () => {
  return 'Hello Jest!!'
}

export default hello
