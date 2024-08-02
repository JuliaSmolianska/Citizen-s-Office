import React from 'react';
import { terms } from '@app/data/data';
import styles from './Terms.module.css';
import Link from 'next/link';

function Terms() {
  return (
    <>
      <div className={`${styles.terms_wrapper} ${styles.root}`}>
        <div className={styles.title_container}>
          <h2 className={styles.title}>Правила та умови</h2>
          <ul className={styles.order}>
            {terms.map((term) => (
              <li className={styles.order_item} key={term.id}>
                {term.text}
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

export default Terms;