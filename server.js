const app = require("./app");

const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Server is running on port ${port}`);
});
