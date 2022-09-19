import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const grandmaDemo = `
const myGrandMotherBirthdayVideo: Video = {
  musicSearchQuery: 'happy birthday',
  scenes: [
    {
      duration: 2,
      stockSearchQuery: 'balloons white background',
      displayText: 'Happy birthday',
    },
    {
      duration: 5,
      stockSearchQuery: 'season snow',
      displayText: 'We wish you the best on your special day',
    },
    {
      duration: 5,
      stockSearchQuery: 'snowfall',
      displayText: 'Have a great day',
    },
  ],
};


`;

const Home: NextPage = () => {
  const [result, setResult] = useState(grandmaDemo);
  const [prompt, setPrompt] = useState(`for my grandmother's birthday`);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setResult('Loading...');
    const result = await (
      await fetch('/api/codex', {
        method: 'POST',
        body: JSON.stringify({
          userPrompt: `make a video ${prompt}`,
          temperature: 0.9,
        }),
      })
    ).json();
    setResult(result.response);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Clipchat FHL</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Clipchat FHL!</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          Hey clipchat ... make a video
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          <button type="button" onClick={generate} disabled={loading}>
            {loading ? 'Loading...' : 'Generate it'}
          </button>
          <textarea cols={40} rows={30} value={result} disabled={loading} />
        </div>
      </main>
    </div>
  );
};

export default Home;
