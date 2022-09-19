import Editor from '@monaco-editor/react';
import { Dispatch, SetStateAction, useRef } from 'react';

export type CodeBlockProps = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
};

export const CodeBlock = (props: CodeBlockProps): JSX.Element => {
  const { code, setCode } = props;

  const monacoEditorRef = useRef<any | null>(null);
  const editorRef = useRef<any | null>(null);

  return (
    <Editor
      height="50vh" // preference
      defaultLanguage="typescript" // preference
      onChange={(value, _event) => {
        setCode(value ?? '');
      }}
      onMount={(editor, monaco) => {
        monacoEditorRef.current = monaco.editor;
        editorRef.current = editor;
      }}
      options={{ minimap: { enabled: false } }}
      theme="vs-dark" // preference
      value={code}
      width="50vw" // preference
    />
  );
};
