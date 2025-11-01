//@ts-check

"use strict";


import * as net from "net";

(function main() {
	const portNum = 2300;
	const loopbackAddress = "127.0.0.1";
	const msg = "Hello World! \n";
	const server = net.createServer(writeToClient);
	const meow = 10;
	server.maxConnections = 1;

	function writeToClient(socket) {
		console.log(`Incoming connection from ${socket.remoteAddress}, sending Welcome!`);
		socket.write(msg);
		socket.on("error", handleError);
		server.close(serverShutDown);
	}

	server.listen({ port: portNum, host: loopbackAddress }, portAndIpInfo(portNum, loopbackAddress));

	function serverShutDown() {
		console.log("Server Shutting Down...");
	}

	function handleError(err) {
		console.log(`Error: ${err}`);
	}

	function portAndIpInfo(portNum, loopbackAddress) {
		console.log(`Server is Listening on port: ${portNum} and is connected to host: ${loopbackAddress}`);
	}

}());
