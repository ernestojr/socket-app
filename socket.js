const socketIO = require('socket.io');
const redisAdapter = require('socket.io-redis');
const redis = require('redis');

const {
	NODE_ID,
	REDIS_HOST,
	REDIS_PORT,
	REDIS_PASSWORD,
	REDIS_DB,
} = process.env;

let io;

const start = (server) => {
	const method = 'start';
	const opts = {
		perMessageDeflate: false,
		maxHttpBufferSize: 10e7,
	};
	const redisOpts = {
		port: REDIS_PORT,
		host: REDIS_HOST,
		password: REDIS_PASSWORD,
		db: REDIS_DB,
	};
	try {
		const pubClient = redis.createClient(redisOpts);
  	const subClient = redis.createClient(redisOpts);
		io = socketIO(server, opts);
		io.adapter(redisAdapter({ pubClient, subClient }));
		io.on('connection', (socket) => {
			try {
				const { id } = socket.handshake.query;
				console.log(`[${NODE_ID}][${method}] Socket io connected to ${id}.`);
				socket.join(id);
				socket.on('disconnect', () => {
					console.log(`[${NODE_ID}][${method}] Socket io disconnected to ${id}.`);
				});
			} catch (error) {
				console.error(`[${NODE_ID}][${method}] Error on connection socket`, error);
				throw error;
			}
		});
	} catch (error) {
		console.error(`[${NODE_ID}][${method}] Error starting socket`, error);
		throw error;
	}
};

const notify = (id, payload) => {
	const method = 'notify';
	if (!io) {
		throw new Error('Socket.io is not connected.');
	}
	try {
		console.log(`[${NODE_ID}][${method}] Sending notifcation to ${id}`, JSON.stringify(payload));
		// if (io.sockets.adapter.rooms[id] === undefined) {
		// 	throw new Error('Missing Client');
		// }
		return io.to(id).emit('notification', payload);
	} catch (error) {
		console.error(`[${NODE_ID}][${method}] Error sending notifcation to ${id}`, error);
		throw error;
	}
};

module.exports = {
	start,
	notify,
};
