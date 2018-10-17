import http from 'http'
import { createServer } from 'http'

import app from './server'

const server = http.createServer(app); // if you are not doing hot module reloading or web sockets dont do this you dont need http create server
let currentApp = app

server.listen(3000, () => {
	console.log('Server logging at port 3000')
})

if (module.hot) {
	module.hot.accept(['./server'], () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	})
}
