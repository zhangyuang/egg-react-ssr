const { exec, fork, spawn } = require('child_process')
const { series, waterfall } = require('async')
const npm = require('npm')

exec('cd ./example/ssr-with-js && npm start', (err, stdout) => {
  if (err) {
    console.log('error', err)
    process.exit()
  }
  exec('nightwatch --config ./e2e/nightwatch.config.js', (err, stdout) => {
    if (err) {
      console.log('error', err)
      process.exit()
    }
    console.log(stdout)
  })
})
// const npm = require('npm')
// waterfall([
//   function (cb) {
//     exec('cd ./example/ssr-with-js && npm start', () => {
//       console.log('xx')
//       cb()
//     })
//     // cb()
//   },
//   function (cb) {
//     exec('nightwatch --config ./e2e/nightwatch.config.js', (err, stdout) => {
//       if (err) {
//         console.log(err)
//       }
//       console.log(stdout)
//       cb()
//     })
//     // cb()
//   }
// ])
