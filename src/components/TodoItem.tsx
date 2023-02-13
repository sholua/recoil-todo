import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { todoListAtom } from '../recoil/atoms/todoAtom';
import { Todo } from '../types';

interface Props {
  item: Todo;
}

export const TodoItem: FC<Props> = ({ item }) => {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = (event: React.FormEvent<HTMLInputElement>) => {
    const newList = replatItemAtIndex(todoList, index, {
      ...item,
      text: event.currentTarget.value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replatItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div className="container">
      <input
        className={item.isComplete.toString() === 'true' ? 'done-task' : ''}
        type="text"
        value={item.text}
        onChange={editItemText}
      />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button className="del-btn" onClick={deleteItem}>
        X
      </button>
    </div>
  );
};

const replatItemAtIndex = (arr: Todo[], index: number, newValue: Todo) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const removeItemAtIndex = (arr: Todo[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};
