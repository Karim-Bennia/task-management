import React from 'react';
import { User } from '@/interfaces/user';
import styles from '../../styles/UserListCard.module.css';

interface UserListCardProps {
  users: User[];
}

const UserListCard: React.FC<UserListCardProps> = ({ users }) => {
  return (
    <div className={styles.userCard}>
      <h3>Team Members</h3>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user._id} className={styles.userItem}>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListCard;
