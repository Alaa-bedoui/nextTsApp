"use client"
import React from 'react';
import styles from './Home.module.css';
import {useRouter} from 'next/navigation';

const Home: React.FC = () => {
  const router=useRouter()
  return (
    <div className={styles.homeContainer}>
      <header className={styles.homeHeader}>
        <h1>Welcome to the Next experience</h1>
      </header>
      <main className={styles.homeMain}>
        <p>
          We're glad to have you here. Explore our features and feel free to reach out if you have any questions.
        </p>
        <button className={styles.homeButton} onClick={()=>{router.push("/items")}}>Get Started</button>
      </main>
      <footer className={styles.homeFooter}>
        <p>&copy; 2024 Our Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
