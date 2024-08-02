import React from 'react';
import { roads } from '@app/data/data';
import styles from './Roads.module.css';
import Link from 'next/link';

function Roads() {
  return (
    <>
      <div className={`${styles.roads_wrapper} ${styles.root}`}>
        <div className={styles.title_container}>
          <h2 className={styles.title}>Дорожня карта</h2>
          <ul className={styles.order}>
            {roads.map((road) => (
              <li className={styles.order_item} key={road.id}>
                {road.text}
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

export default Roads;