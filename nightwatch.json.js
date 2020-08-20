/* {
    "src_folders" : ["tests"],
    "output_folder" : "reports",
  
    "selenium" : {
      "start_process" : false,
      "server_path" : "",
      "log_path" : "",
      "host" : "127.0.0.1",
      "port" : 4444,
      "cli_args" : {
        "webdriver.chrome.driver" : "",
        "webdriver.ie.driver" : ""
      }
    },
  
    "test_settings" : {
      "default" : {
        "launch_url" : "http://localhost:3000",
        "selenium_port"  : 4444,
        "selenium_host"  : "localhost",
        "silent": true,
        "screenshots" : {
          "enabled" : false,
          "path" : ""
        },
        "desiredCapabilities": {
          "browserName": "chrome",
          "javascriptEnabled": true,
          "acceptSslCerts": true
        }
      },
  
      "chrome" : {
        "desiredCapabilities": {
          "browserName": "chrome",
          "javascriptEnabled": true,
          "acceptSslCerts": true
        }
      }
    }
  } */

/* 
  {
	"src_folders": ["tests"],
	"output_folder": "reports",

	"selenium": {
		"start_process": true,
		"server_path": "/mnt/d/Download/selenium-server-standalone-3.141.59.jar",
		"log_path": "",
		"host": "127.0.0.1",
		"port": 4444,
		"cli_args": {
			"webdriver.chrome.driver": "./node_modules/chromedriver/lib/chromedriver/chromedriver",
			"webdriver.ie.driver": ""
		}
	},

	"test_settings": {
		"default": {
			"launch_url": "http://localhost:3000",
			"selenium_port": 4444,
			"selenium_host": "localhost",
			"silent": true,
			"screenshots": {
				"enabled": false,
				"path": ""
			},
			"desiredCapabilities": {
				"browserName": "chrome",
				"javascriptEnabled": true,
				"acceptSslCerts": true,
				"chromeOptions": {
					"args": ["--no-sandbox", "incognito", "disable-extensions"],
					"binary": "/mnt/c/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe"
				}
			}
		},

		"chrome": {
			"desiredCapabilities": {
				"browserName": "chrome",
				"javascriptEnabled": true,
				"acceptSslCerts": true
			}
		}
	}
}

  */
