import React from 'react';
import styles from '../../styles/TaskSummaryCard.module.css';

interface TaskSummaryCardProps {
  title: string;
  number: number;
  color: string;
  icon: string;
}

const TaskSummaryCard: React.FC<TaskSummaryCardProps> = ({ title, number, color, icon }) => {
  return (
    <div className={styles.card} style={{ backgroundColor: color }}>
      <div className={styles.icon}>
        <i className={`fa fa-${icon}`} aria-hidden="true"></i> {/* Font Awesome Icons */}
      </div>
      <div className={styles.details}>
        <span className={styles.number}>{number}</span>
        <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
};

export default TaskSummaryCard;
