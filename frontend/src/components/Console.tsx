import { useState, useEffect } from 'react';

interface ConsoleProp{
    output: string;
    setOutput: (val: string) => void;
}

const Console = ({output,setOutput}:ConsoleProp) => {
  const [height, setHeight] = useState(250);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      // Calculate new height (distance from mouse to bottom of screen)
      // Since it's docked at the bottom, window.innerHeight - e.clientY approximates it well
      const newHeight = window.innerHeight - e.clientY;
      const clampedHeight = Math.max(100, Math.min(newHeight, window.innerHeight * 0.8));
      setHeight(clampedHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = 'auto'; // Restore selection
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection while dragging
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'auto';
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  return (
    <div style={{ height: `${height}px`, display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Resizer Handle */}
      <div 
        onMouseDown={handleMouseDown}
        style={{
          height: "8px",
          cursor: "ns-resize",
          backgroundColor: isDragging ? "#007acc" : "transparent",
          position: "absolute",
          top: -4, // pull it up slightly to give a bigger click target without taking space
          left: 0,
          right: 0,
          zIndex: 20,
          transition: "background-color 0.2s"
        }}
        onMouseEnter={(e) => {
           if (!isDragging) e.currentTarget.style.backgroundColor = "#007acc88";
        }}
        onMouseLeave={(e) => {
           if (!isDragging) e.currentTarget.style.backgroundColor = "transparent";
        }}
      />
      <div style={{ 
          backgroundColor: "#1A1A1A", 
          color: "#A1A1AA", 
          margin: 0, 
          padding: 0, 
          flex: 1, 
          overflowY: "auto", 
          overflowX: "hidden", 
          display: "flex", 
          flexDirection: "column" 
      }}>
         <div style={{
            fontSize: "14px",
            borderTop: "1px solid #3E3E42",
            borderBottom: "1px solid #3E3E42", 
            position: "sticky", 
            top: 0, 
            zIndex: 10,
            minHeight: "40px",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#1A1A1A",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontWeight: "600",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
         }}>
          <span>Console</span>
          <span 
            style={{ fontSize: "13px", fontWeight: "normal", cursor: "pointer", color: "#A1A1AA", textTransform: "none" }} 
            onClick={() => setOutput("")}
            onMouseEnter={(e) => e.currentTarget.style.color = "#FFF"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#A1A1AA"}
          >
            Clear
          </span>
         </div>
         
         {!output || output.trim() === "" ? (
           <p style={{ color: "#8a8a8a", padding: "16px", margin: 0, fontSize: "14px", fontFamily: "monospace" }}>Run your code to see output here</p> 
         ) : (
           <pre style={{ color: "#FAFAFA", padding: "16px", margin: 0, fontSize: "14px", whiteSpace: "pre-wrap", fontFamily: "monospace" }}>{output}</pre> 
         )}
      </div>
    </div>
  )
}

export default Console;