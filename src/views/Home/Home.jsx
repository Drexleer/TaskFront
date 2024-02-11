import { useEffect } from 'react';
import NewTask from '../../components/NewTask/NewTask';
import { fetchAllTask } from '../../redux/Slices/getAllTask';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.allTasks.tasks);
  const user = useSelector((state) => state.user.userInfo.username);

  useEffect(() => {
    dispatch(fetchAllTask());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Bienvenido, {user ? user : 'Invitado'}</h1>
      <NewTask />
      <div className="card-container">
        {allTasks ? (
          allTasks.map((task) => (
            <Card
              title={task.title}
              description={task.description}
              status={task.status}
              id={task.id}
              key={task.id}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
