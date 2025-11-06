//@ts-check

"use strict";

import * as net from "net";

(function main() {
	const portNum = process.argv[2];
	if (portNum === null || portNum === undefined) {
		console.log("No Command Line Argument for Port Number given!!!");
		return false;
	}
	const address = process.argv[3];
	if (address === null || address === undefined) {
		console.log("No Command Line Argument for Address given!!!");
		return false;
	}
	const msg = "Hello World! \n";
	const server = net.createServer(writeToClient);
	server.maxConnections = 1;

	function writeToClient(socket) {
		console.log(`Incoming connection from ${socket.remoteAddress}, sending Welcome!`);
		socket.write(msg);
		socket.on("error", handleError);
		server.close(serverShutDown);
	}

	server.listen({ port: portNum, host: address }, portAndIpInfo(portNum, address));

	function serverShutDown() {
		console.log("Server Shutting Down...");
	}

	function handleError(err) {
		console.log(`Connection could not be made, error code: ${err}`);
	}

	function portAndIpInfo(portNum, address) {
		console.log(`Server is Listening on port: ${portNum} and is connected to host: ${address}`);
	}

}());
