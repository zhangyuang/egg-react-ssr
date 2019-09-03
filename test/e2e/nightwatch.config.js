module.exports = {
  'src_folders': ['test/e2e/specs'],
  'selenium': {
    'start_process': true,
    'server_path': require('selenium-server').path,
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },
  'test_settings': {
    'default': {
      'selenium_port': 4444,
      'selenium_host': 'localhost',
      'silent': true,
      'screenshots': {
        'enabled': true,
        'on_failure': true,
        'on_error': false,
        'path': 'test/e2e/screenshots'
      }
    },

    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    }
  }
}
