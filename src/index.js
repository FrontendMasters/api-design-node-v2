import http from 'http'
import { createServer } from 'http'

import app from './server'
let currentApp = app

currentApp.listen(3000, () => {
	console.log('http://localhost:3000')
})

if (module.hot) {
	module.hot.accept(['./server'], () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	})
}
