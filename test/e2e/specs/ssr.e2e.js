module.exports = {
  'hope ssr application can be start succeed': function (browser) {
    browser
      .url('http://localhost:7001')
      .assert.containsText('.author', 'by ykfe')
      .end()
  },
  'hope csr application can be start succeed': function (browser) {
    browser
      .url('http://localhost:8000')
      .assert.containsText('#app', '')
      .end()
  }
}
