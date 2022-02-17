const app = require("./app");
const { port } = require("./config/db");

app.listen(port || 5000, () => {
    console.log(`Server is running on port: ${port}`);
});