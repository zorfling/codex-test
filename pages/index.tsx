import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import styles from '../styles/Home.module.css';

const grandmaDemo = /*ts*/ `
// make a video for my grandmother's birthday. make it 14 seconds long
const grandmaVideo: Project = {
  prompt: 'make a video for my grandmother\\\'s birthday. make it 14 seconds long',
  musicSearchQuery: 'nostalgic happy music',
  scenes: [
    {
      duration: 4,
      stockSearchQuery: 'portrait of grandma',
      displayText: 'Dearest Grandma',
    },
    {
      duration: 3,
      stockSearchQuery: 'grandma cooking',
      displayText: 'Remember the holidays',
    },
    {
      duration: 4,
      stockSearchQuery: 'grandma with grandchildren',
      displayText: 'I miss you',
    },
    {
      duration: 3,
      stockSearchQuery: 'grandma smiling',
      displayText: 'Hope you are doing well',
    },
  ],
}
`;

const originalPrompt = /*ts*/ `interface Project {
  prompt: string;
  musicSearchQuery: string;
  scenes: Scene[];
}

interface Scene {
  duration: number;
  stockSearchQuery: string;
  displayText: string;
}

// make a video for a birthday. make it 30 seconds long
const birthdayVideo: Project = {
  prompt: 'make a video for a birthday. make it 30 seconds long',
  musicSearchQuery: 'nostalgic happy music',
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

// make a graduation video. make it 20 seconds long
const graduationVideo: Project = {
  prompt: 'make a graduation video. make it 20 seconds long',
  musicSearchQuery: 'pompous regal music',
  scenes: [
    {
      duration: 5,
      stockSearchQuery: 'confetti popping',
      displayText: 'Congratulations',
    },
    {
      duration: 5,
      stockSearchQuery: 'young adult in graduation cap',
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

// make a youtube gaming video. make it 15 seconds long
const gamingVideo: Project = {
  prompt: 'make a youtube gaming video. make it 15 seconds long',
  musicSearchQuery: 'upbeat gaming music',
  scenes: [
    {
      duration: 3,
      stockSearchQuery: 'gaming controller',
      displayText: 'Welcome to my channel',
    },
    {
      duration: 5,
      stockSearchQuery: 'gaming chair with controller',
      displayText: 'I play the game',
    },
    {
      duration: 5,
      stockSearchQuery: 'first person shooter footage',
      displayText: 'Watch me win this game',
    },
    {
      duration: 2,
      stockSearchQuery: 'swirling patterns',
      displayText: 'Yeah I did it',
    },
  ],
}

// make a video for my grandmother's birthday. make it 14 seconds long
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
