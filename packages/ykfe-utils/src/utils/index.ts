import { resolve } from 'path'

const resolveDir = (path: string) => resolve(process.cwd(), path)

const logGreen = (text: string) => {
  console.log(`\x1B[32m ${text}`)

}
export {
    resolveDir,
    logGreen
}
