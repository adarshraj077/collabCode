import Editor from "@monaco-editor/react";

interface EditorCompProps {
  code: string;
  language: string;
  handleCodeChange: (value: string | undefined) => void;
}

const EditorComp = ({ code, language, handleCodeChange }: EditorCompProps) => {
  return (
    <div
      style={{
        height: "100%", // Inherit height from parent instead of hardcoding 70vh
        margin: 0,
        padding: 0,
        lineHeight: 0,
        overflow: "hidden",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Editor
        height="100%"
        width="100%"
        path={language}
        language={language}
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
        options={{
          fontSize: 13,
          contextmenu: false,
          padding: {
            top: 0,
            bottom: 0,
          },
          minimap: {
            enabled: true,
            scale: 1.8,
            autohide: true,
            maxColumn: 200,
            size: "proportional",
            renderCharacters: false,
          }
        }}
      />
    </div>
  )
}

export default EditorComp;