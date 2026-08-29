
interface DashCard{
    roomId: string;
    language: string;

}


const dashCard = ({ roomId, language }:DashCard) => {
  return (
    <>
      <div style={{border:"1px solid #9c9ea2",padding:"10px",marginTop:"10px",borderRadius:"5px"}}>
      roomId: {roomId} <br />
      language: {language}
      </div>
    </>
  )
}

export default dashCard