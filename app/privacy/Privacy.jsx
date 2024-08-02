import React from 'react';
import { privacy } from '@app/data/data';
import styles from './Privacy.module.css';
import Link from 'next/link';

function Privacy() {
  return (
    <>
      <div className={`${styles.privacy_wrapper} ${styles.root}`}>
        <div className={styles.title_container}>
          <h2 className={styles.title}>Політика конфіденційності</h2>
          <ul className={styles.order}>
            {privacy.map((priv) => (
              <li className={styles.order_item} key={priv.id}>
                {priv.text}
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

export default Privacy;