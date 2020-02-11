import { promisify } from 'util'
import webpack from 'webpack'

const webpackWithPromise = promisify(webpack)

export {
    webpackWithPromise
}
