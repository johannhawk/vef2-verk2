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
      <section class="todo-list">
        <form method="post" action="/add">
          <input type="text" name="title" />
          <button>bæta við</button>
        </form>

        <form method="post" action="/update/:id">
          <button>uppfaera ID placeholder</button>
        </form>
        <form method="post" action="/delete/finished">
          <button>eyda klarad placeholder</button>
        </form>
        <form method="post" action="/delete/:id">
          <button>eyda ID placeholder</button>
        </form>

        <TodoList title="Allur listinn" todos={todos} />
        <TodoList title="Bara kláruð verkefni" todos={finished} />
        <TodoList title="Bara ókláruð verkefni" todos={unfinished} />

        <p>Ég fékk {todos.length} verkefni.</p>
      </section>
    </Layout>
  );
};
