"use client";

import React, { useEffect, useState } from 'react';
import TaskSummaryCard from '../../components/dashboardComponent/TaskSummaryCard';
import TaskSummaryChart from '../../components/dashboardComponent/TaskSummaryChart';
import UserListCard from '../../components/dashboardComponent/UserList';
import { getTaskSummary, getUsers } from '@/services/api';
import { User } from '@/interfaces/user';
import styles from '../../styles/Dashboard.module.css';
import { TaskSummary } from '@/interfaces/task';
import { useAuth } from '@/context/AuthContext';
import { FaSpinner } from 'react-icons/fa'; // Spinner icon for loading

const Dashboard: React.FC = () => {
  const [taskSummary, setTaskSummary] = useState<TaskSummary | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskSummaryData = await getTaskSummary();
        const usersData = await getUsers();
        setTaskSummary(taskSummaryData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isAuthenticated) {
    return ( 
      <div className={styles.center}>
        <p>Please log in to view the task board.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.center}>
        <FaSpinner className={styles.spinner} />
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboard}>
        <h1 className={styles.dashboardTitle}>Task Management Dashboard</h1>

        {/* Task Summary Cards and Chart on the same line */}
        <div className={styles.taskSummarySection}>
          {taskSummary && (
            <>
              <TaskSummaryCard 
                title="Total Tasks" 
                number={taskSummary.totalTasks} 
                color="#917FFF" 
                icon="check-circle" 
              />
              <TaskSummaryCard 
                title="In Progress" 
                number={taskSummary.inprogressTasks} 
                color="#89CFF0" 
                icon="clock" 
              />
              <TaskSummaryCard 
                title="Pending" 
                number={taskSummary.pendingTasks} 
                color="#FFA07A" 
                icon="alert" 
              />
              <TaskSummaryCard 
                title="Completed" 
                number={taskSummary.completedTasks} 
                color="#98FB98" 
                icon="check" 
              />

              {/* Task Summary Chart */}
              <TaskSummaryChart 
                completedTasks={taskSummary.completedTasks} 
                pendingTasks={taskSummary.pendingTasks} 
                inProgressTasks={taskSummary.inprogressTasks} 
              />
            </>
          )}
        </div>

        {/* User List Section */}
        <div className={styles.userListSection}>
          <UserListCard users={users} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
