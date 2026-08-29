import { useNavigate } from "react-router-dom";
import "./popUp.css";

interface ErrorPopUpProps {
  isShow: boolean;
  errorMessage: string;
}

function ErrorPopUp({ isShow, errorMessage }: ErrorPopUpProps) {
  const navigate = useNavigate();

  if (!isShow) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2vh",
          flexDirection: "column",
          gap: "3vh",
          textAlign: "center"
        }}>
          <h2 style={{
            margin: "0",
            padding: "0",
            color: "#ffffff5e",
            fontFamily: "monospace",
            fontSize: "clamp(18px, 3vw, 22px)"
          }}>
            {errorMessage}
          </h2>

          <button 
            className="join-room-btn" 
            style={{ margin: "0 auto", marginTop: "10px", borderColor: "#45474a" }} 
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPopUp;
