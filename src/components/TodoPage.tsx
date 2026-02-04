import type { FC } from 'hono/jsx';

import type { Todo } from '../types.js';
import { TodoList } from './TodoList.js';
import { Layout } from './Layout.js';

type TodoPageProps = {
  todos?: Todo[];
};

export const TodoPage: FC<TodoPageProps> = ({ todos = [] }) => {
  const finished = todos.filter(i => i.finished)
  const unfinished = todos.filter(i => !i.finished)

  return (
    <Layout title="TodoListinn">
      <section>
        <p>Halló hono heimur!</p>
        <form method="post" action="/add">
          <input type="text" name="title" />
          <input type="file" name="file" />
          <input type="checkbox" name="checkbox" />
          <select name="select"><option>foo</option></select>
          <textarea name="text"></textarea>
          <button>bæta við</button>
        </form>

        <TodoList title="Allur listinn" todos={todos} />
        <TodoList title="Bara kláruð verkefni" todos={finished} />
        <TodoList title="Bara ókláruð verkefni" todos={unfinished} />

        <p>Ég fékk {todos.length} verkefni.</p>
      </section>
    </Layout>
  );
};
