const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "todoApplication.db");
const app = express();
app.use(express.json());

let db = null;
const initializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DataBase error is ${error.message}`);
    process.exit(1);
  }
};
initializeDBandServer();

/*app.get("/todos/", async (request, response) => {
  const requestQuery = `
  SELECT 
  *
   FROM todo;`;
  const responseResult = await db.all(requestQuery);
  response.send(responseResult);
});*/

app.get("/todos/", async (request, response) => {
  const { status } = request.query;
  const requestQuery = `
  SELECT 
  *
   FROM todo
   WHERE 
   status="${status}";`;
  const responseResult = await db.all(requestQuery);
  response.send(responseResult);
});

app.get("/todos/", async (request, response) => {
  const { priority } = request.query;
  const requestQuery = `
  SELECT 
  *
   FROM todo
   WHERE 
   priority="${priority}";`;
  const responseResult = await db.all(requestQuery);
  response.send(responseResult);
});

app.get("/todos/", async (request, response) => {
  const { priority, status } = request.query;
  const requestQuery = `
  SELECT 
  *
   FROM todo
   WHERE 
   priority="${priority}"
   AND 
   status="${status}
   ;`;
  const responseResult = await db.all(requestQuery);
  response.send(responseResult);
});

app.get("/todos/", async (request, response) => {
  const { search_q } = request.query;
  const requestQuery = `
  SELECT 
  *
   FROM todo
   WHERE 
   todo LIKE "%${search_q}%";`;
  const responseResult = await db.all(requestQuery);
  response.send(responseResult);
});

// GET todo API 2

app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const requestQuery = `
  SELECT 
  *
   FROM todo
   WHERE 
   id=${todoId};`;
  const responseResult = await db.all(requestQuery);
  response.send(responseResult);
});

// POST todo API 3

app.post("/todos/", async (request, response) => {
  const todoDetails = request.body;
  const AddTodoQuery = `
    INSERT INTO 
    table (id,todo,priority,status)
    VALUES 
    (
        id=${id},
        todo="${todo}",
        priority="${priority}",
        status="${status}"
    );
    `;
  const dbRes = await db.run(AddTodoQuery);
  response.send("Todo Successfully Added");
});

app.put("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const { status } = request.body;
  const updateTodoQuery = `
    UPDATE todo 
    SET 
    status="${status}"
    WHERE 
    id=${todoId};
    `;
  const dbRes = await db.run(updateTodoQuery);
  response.send("Status Updated");
});

module.exports = app;
