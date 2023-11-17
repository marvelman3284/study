// TODO : LATEX rendering using katex

import Link from 'next/link';
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by creating a new study set below
        </p>
      </div>

      <div className={styles.grid}>
        <Link
          href="/create-deck"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
            Create a new study deck <span>-&gt;</span>
          </h2>
          <p>Exactly what the title says</p>
        </Link>

        <Link
          href="/view"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Review your study sets</p>
        </Link>
      </div>
    </main>
  )
}
