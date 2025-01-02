import styles from "./page.module.css";
import { Test } from '@/components/Test';

export default function Home() {

  return (
    <div className={styles.page}>
      <Test />
    </div>
  );
}
