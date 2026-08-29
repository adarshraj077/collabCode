

interface ConsoleProp{
    output: string;
    setOutput: (val: string) => void;
}

const Console = ({output,setOutput}:ConsoleProp) => {

  return (
    <>
   <div style={{ borderRadius: "5px" ,backgroundColor: "#1A1A1A" ,color:"#A1A1AA",margin:"0",padding:"0",marginTop:"0", minHeight: "200px", overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
               <div style={{marginTop:"0",fontSize:"20px",borderBottom:"1px solid #3E3E42", position: "sticky", top: 0, zIndex: 10,borderTop:"1px solid #3E3E42", height: "2.5vw",paddingLeft:"2vw",display:"flex",alignItems:"center",justifyContent:"space-between",paddingRight:"2vw",backgroundColor: "#1A1A1A"}}>
                <span>console</span>
                <p style={{fontSize:"14px",fontWeight:"lighter" , cursor:"pointer", margin: 0}} onClick={()=>{setOutput("")}}>clear</p>
               </div>
               
               {!output || output.trim() === "" ? (
                 <p style={{color:"#A1A1AA",paddingTop:"1vw",paddingLeft:"2vw" }}>Run your code to see output here</p> 
               ) : (
                 <pre style={{color:"#FAFAFA",paddingTop:"1vw",paddingLeft:"2vw"}}>{output}</pre> 
               )}
             </div>
    
    </>
  )
}

export default Console