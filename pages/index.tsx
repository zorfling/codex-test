import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import styles from '../styles/Home.module.css';

const grandmaDemo = `
// make a video for my grandmother's birthday
const myGrandMotherBirthdayVideo: Project = {
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

const originalPrompt = `interface Project {
  musicSearchQuery: string;
  scenes: Scene[];
}

interface Scene {
  duration: number;
  stockSearchQuery: string;
  displayText: string;
}

// make a video for a child's birthday with 7 scenes
const birthdayVideo: Project = {
  musicSearchQuery: 'yesterday',
  scenes: [
    {
      duration: 5,
      stockSearchQuery: 'childhood fun',
      displayText: 'A year to remember',
    },
    {
      duration: 4,
      stockSearchQuery: 'children imagination',
      displayText: 'A joy for life',
    },
    {
      duration: 4,
      stockSearchQuery: 'kid learning',
      displayText: 'Always learning',
    },
    {
      duration: 2,
      stockSearchQuery: 'science',
      displayText: 'A curious mind',
    },
    {
      duration: 5,
      stockSearchQuery: 'child playing',
      displayText: 'Keep pushing boundaries',
    },
    {
      duration: 5,
      stockSearchQuery: 'purple background',
      displayText: 'Happy birthday',
    },
    {
      duration: 5,
      stockSearchQuery: 'hearts',
      displayText: 'We love you',
    },
  ],
};

// make a graduation video with 4 scenes
const graduationVideo: Project = {
  musicSearchQuery: 'graduation',
  scenes: [
    {
      duration: 5,
      stockSearchQuery: 'confetti popping',
      displayText: 'Congratulations',
    },
    {
      duration: 5,
      stockSearchQuery: 'graduation cap',
      displayText: 'We are so proud of you',
    },
    {
      duration: 5,
      stockSearchQuery: 'stars galaxies',
      displayText: 'You are amazing',
    },
    {
      duration: 5,
      stockSearchQuery: 'love heart',
      displayText: 'We love you',
    },
  ],
}

// make a video for my grandmother's birthday
`;

const Home: NextPage = () => {
  const [result, setResult] = useState(grandmaDemo);
  const [prompt, setPrompt] = useState(originalPrompt);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setResult('// Loading...');
    const result = await (
      await fetch('/api/codex', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
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
        <p>Hey clipchat ... make a video</p>
        <p>
          (edit the last line of the code on the left (// make a video ...) and
          click &ldquo;Generate&rdquo;)
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            justifyContent: 'stretch',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              flex: 1,
            }}
          >
            Input:
            <CodeBlock code={prompt} setCode={setPrompt} />
            <button type="button" onClick={generate} disabled={loading}>
              {loading ? 'Loading...' : 'Generate'}
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              flex: 1,
            }}
          >
            Output:
            <CodeBlock code={result} setCode={() => {}} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
