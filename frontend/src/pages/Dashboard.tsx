import Navbar from "../components/Navbar";
import loadDashboardData from "../api/dashboard";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

import "../pages/dash.css";
import refreshIcon from "../public/refresh.png";
import PopUp from "../components/popUp";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any[] | null>(null);
  const [popUpKey, setPopUpKey] = useState(0);

  const fetchData = useCallback(async () => {
    const data = await loadDashboardData();
    return data;
  }, []);

  const token = localStorage.getItem("token");
   let  username = "Guest";
  
   let count=0;

  if(token){
    const payload = JSON.parse(atob(token.split(".")[1]));
    username = payload.username;
  }

  const createRoom = async () => {

        const token = localStorage.getItem("token");
        try {

            const res = await axios.post(BACKEND_URL + "/rooms", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const nextRoomId = res.data.id;

            if (!nextRoomId) {
                console.error("No room id returned from server", res.data);
                return;
            }

            localStorage.setItem("roomId", nextRoomId);
            console.log(nextRoomId);
            navigate(`/room/${nextRoomId}`);
        } catch (err) {
            console.log(err);
        }
    }

  



  useEffect(() => {
    fetchData().then((data) => {
      if (data.success) {
        const sortedData = data.data.sort((a: any, b: any) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        setDashboardData(sortedData);
        console.log("Dashboard data:", sortedData);
      } else {
        console.error("Error loading dashboard data:", data.message);
      }
    });
  }, [fetchData,count]);
  

  return (
    <>
      <Navbar />
     
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#191b20",
          paddingLeft: "5vw",
          paddingTop: "5vh",
          paddingRight: "5vw",
          color: "#9c9ea2",
          fontFamily: "monospace",
          fontWeight: "lighter",
         
        }}
        >
      

         <div className="dash-header">
  <h1 className="dash-title">{`welcome, ${username}`}</h1> 
  <div className="dash-actions">
    <button className="dashButton" onClick={createRoom}>
      + create room
    </button>
    <button className="dashButton" onClick={() => setPopUpKey(prev => prev + 1)}>
      join room
    </button>
    <button className="dashButton iconButton" onClick={() => count += 1}>
      <img src={refreshIcon} alt="refresh" />
    </button>
  </div>
  

</div>

   <div className="warn">
         <p style={{paddingRight:"5vw"}}>rooms expires automatically after 24 hours </p>
      </div>

        {dashboardData === null ? (
          <p>Loading dashboard data...</p>
        ) : dashboardData.length === 0 ? (
          <p>No rooms joined yet.</p>
        ) : (
          dashboardData.map((room: any) => (
            <div
              key={room.id}
              onClick={() => navigate(`/room/${room.id}`)}
              style={{
                borderBottom: "1px solid #667082",
                borderRadius: "8px",
                marginTop: "2vh",
                padding: "16px",
                marginBottom: "16px",
                cursor: "pointer",
                boxShadow: "0 10px 8px rgba(3, 14, 24, 0.71)",
              }}
            >
              <p style={{ color: "#bdc7d9", margin: "4px 0" }}>Room ID: {room.id}</p>
              <p style={{ color: "#667082", margin: "4px 0" }}>Language: {room.language}</p>
              {room.createdAt && (
                <p style={{ color: "#667082", margin: "4px 0" }}>
                  Created At: {new Date(room.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              )}
            </div>
          ))
        )}
      </div>
     
      {popUpKey > 0 && <PopUp key={popUpKey} isShow={true} />}

    </>
  );
};

export default Dashboard;