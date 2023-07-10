const app = require("./app");
const net = require("net");

const findAvailablePort = (startPort, callback) => {
  const server = net.createServer();
  server.unref();
  server.on("error", () => {
    findAvailablePort(startPort + 1, callback);
  });
  server.listen(startPort, () => {
    server.close(() => {
      callback(startPort);
    });
  });
};

const server = () => {
  findAvailablePort(3000, (port) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
};

server();
