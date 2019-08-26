module.exports = {
  'SSR': function (browser) {
    browser
      .url('http://localhost:7001')
      .assert.containsText('.author', 'by ykfe')
  }
  // 'CSR': function (browser) {
  //   browser
  //     .url('http://localhost:8000')
  //     .assert.containsText('#app', '')
  //     .end()
  // }
}
