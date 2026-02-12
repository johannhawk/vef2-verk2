import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { TodoPage } from "./components/TodoPage.js";
import type { Todo } from "./types.js";
import { createTodo, init, listTodos } from "./lib/db.js";
import { AboutPage } from "./components/About.js";
import { TodoItemSchema } from "./lib/validation.js";
import z from "zod";
import { ErrorPage } from "./components/ErrorPage.js";

// búum til og exportum Hono app
export const app = new Hono();

// sendir út allt sem er í static möppunni
app.use("/*", serveStatic({ root: "./static" }));

app.get("/", async (c) => {
  await init();
  const todos = await listTodos();

  if (!todos) {
    console.error("villa við að sækja todos", todos);
    return c.text("villa!");
  }

  return c.html(<TodoPage todos={todos} />);
});

app.get("/about", async (c) => {
  return c.html(<AboutPage />);
});

app.post("/add", async (c) => {
  const body = await c.req.parseBody();

  const result = TodoItemSchema.safeParse(body);

  if (!result.success) {
    // Villa!
    console.error(z.flattenError(result.error));
    return c.html(
      <ErrorPage>
        <p>Titill ekki rétt formaður!</p>
      </ErrorPage>,
      400,
    );
  }  

  const dbResult = await createTodo(result.data);

  if (!dbResult) {
    return c.html(
      <ErrorPage>
        <p>Gat ekki vistað í gagnagrunni.</p>
      </ErrorPage>,
      500,
    );
  }

  return c.redirect('/');
});

app.post("/update/:id", async (c) => {

});

app.post("/delete/finished", async (c) => {

});

app.post("/delete/:id", async (c) => {

});

app.notFound((c) => c.json({ error: 'not found'}, 404))