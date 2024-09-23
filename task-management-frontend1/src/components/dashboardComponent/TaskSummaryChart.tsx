import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import styles from '../../styles/Dashboard.module.css';

interface TaskSummaryChartProps {
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
}

const TaskSummaryChart: React.FC<TaskSummaryChartProps> = ({ completedTasks, pendingTasks, inProgressTasks }) => {
  const data = [
    { name: 'Completed', value: completedTasks, color: '#28a745' },
    { name: 'In Progress', value: inProgressTasks, color: '#ffc107' },
    { name: 'Pending', value: pendingTasks, color: '#dc3545' },
  ];

  return (
    <div className={styles.chartContainer}>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default TaskSummaryChart;
