import React from 'react';
import { missions } from '@app/data/data';
import styles from './Mission.module.css';
import Link from 'next/link';

function Mission() {
  return (
    <>
      <div className={`${styles.mission_wrapper} ${styles.root}`}>
        <div className={styles.title_container}>
          <h2 className={styles.title}>Наша місія</h2>
          <ul className={styles.order}>
            {missions.map((mission) => (
              <li className={styles.order_item} key={mission.id}>
                {mission.text}
              </li>
            ))}
          </ul>
        </div>
        <button className={styles.scrollButton}>
          <Link href="/">На головну</Link>
        </button>
      </div>
    </>
  );
}

export default Mission;
