import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { increment, decrement, incrementByAmount } from './counterSlice';

const Counter: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={() => dispatch(increment())}>Incrementar</button>
      <button onClick={() => dispatch(decrement())}>Decrementar</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Incrementar por 5
      </button>
    </div>
  );
};

export default Counter;
