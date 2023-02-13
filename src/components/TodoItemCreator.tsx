import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListAtom } from '../recoil/atoms/todoAtom';
import { generateUID } from '../utils/uuid';
import { Todo } from '../types';

export const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const [_, setTodoList] = useRecoilState(todoListAtom);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const addTodoItem = () => {
    if (inputValue) {
      setTodoList((oldTodoList: Todo[]) => [
        ...oldTodoList,
        {
          id: generateUID(),
          text: inputValue,
          isComplete: false,
        },
      ]);
      setInputValue('');
    }
  };

  return (
    <div className="todo-creator">
      <input type="text" value={inputValue} onChange={onChange} />
      <button className="add-btn" onClick={addTodoItem}>
        Add Task
      </button>
    </div>
  );
};
