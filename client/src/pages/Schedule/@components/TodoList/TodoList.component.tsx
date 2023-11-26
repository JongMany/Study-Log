import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTodoDummy } from '../../../../@constants/todoDummy';
import Todo from './Todo.component';

type Props = {
  date: Date;
};

export default function TodoList({ date }: Props) {
  const { isFetching, data, isError } = useQuery({
    queryKey: ['todo', date],
    queryFn: () => getTodoDummy,
  });

  if (isFetching) return <div>로딩 중...</div>;

  return (
    <ul>
      {data?.data.map((item) => (
        <Todo key={item.id} todo={item.todo} />
      ))}
    </ul>
  );
}
