import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import { Cell } from './Cell';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const fetchBoard = async () => {
    const res = await apiClient.board.$get().catch(returnNull);
    if (res !== null) {
      setBoard(res);
    }
  };
  const onClick = async (x: number, y: number) => {
    await apiClient.board.$post({
      body: { x, y },
    });
    await fetchBoard();
  };
  useEffect(() => {
    const cancelId = setInterval(fetchBoard, 500);
    return () => {
      clearInterval(cancelId);
    };
  });
  // const [tasks, setTasks] = useState<TaskModel[]>();
  // const [label, setLabel] = useState('');
  // const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
  //   setLabel(e.target.value);
  // };
  // const fetchTasks = async () => {
  //   const tasks = await apiClient.tasks.$get().catch(returnNull);

  //   if (tasks !== null) setTasks(tasks);
  // };
  // const createTask = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!label) return;

  //   await apiClient.tasks.post({ body: { label } });
  //   setLabel('');
  //   await fetchTasks();
  // };
  // const toggleDone = async (task: TaskModel) => {
  //   await apiClient.tasks._taskId(task.id).patch({ body: { done: !task.done } });
  //   await fetchTasks();
  // };
  // const deleteTask = async (task: TaskModel) => {
  //   await apiClient.tasks._taskId(task.id).delete();
  //   await fetchTasks();
  // };

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  if (!board || !user) return <Loading visible />;
  let white_num = 0;
  // for (let x = 0; x <= 7; x += 1) {
  //   for (let y = 0; y <= 7; y += 1) {
  //     if (board[y][x] === 2) {
  //       white_num += 1;
  //     }
  //   }
  // }

  // let black_num = 0;
  // for (let x = 0; x <= 7; x += 1) {
  //   for (let y = 0; y <= 7; y += 1) {
  //     if (board[y][x] === 1) {
  //       black_num += 1;
  //     }
  //   }
  // }
  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((color, x) => (
              <Cell key={`${x}-${y}`} color={color} onClick={() => onClick(x, y)} />
            ))
          )}
        </div>
        <div className={styles.turndetails}>
          {/* <h1>{turncolor === 1 ? '黒' : '白'}の番です</h1> */}
          {/* <h1>白 {white_num}</h1> */}
          {/* <h1>{black_num} 黒</h1> */}
        </div>
      </div>
      {/* <div className={styles.title} style={{ marginTop: '160px' }}>
        Welcome to frourio!
      </div>

      <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTask}>
        <input value={label} type="text" onChange={inputLabel} />
        <input type="submit" value="ADD" />
      </form>
      <ul className={styles.tasks}>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input type="checkbox" checked={task.done} onChange={() => toggleDone(task)} />
              <span>{task.label}</span>
            </label>
            <input
              type="button"
              value="DELETE"
              className={styles.deleteBtn}
              onClick={() => deleteTask(task)}
            />
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default Home;
