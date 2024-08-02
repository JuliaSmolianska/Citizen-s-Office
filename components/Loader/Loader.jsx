
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={`${styles.loaderContainer} ${styles.root}`}>
      <div className={styles.loader}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}></div>
        </div>
        <div className={styles.innerCircle}></div>
        <div className={styles.outerCircle}></div>
      </div>
      <p className={styles.quote}>
        «Борітеся - поборете,  Вам Бог помога <span className={styles.reversedLetter}>є</span>!» <br />
        <span className={styles.author}>Тарас Шевченко</span>
      </p>
    </div>
  );
};

export default Loader;
