import Card from "../components/Card"
import "./about.css"

const LinkedinIcon = ({size}: {size: number}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const GithubIcon = ({size}: {size: number}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
);

const InstagramIcon = ({size}: {size: number}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const About = () => {
  return (
    <>
    <div style={{minHeight:"100vh",width:"100%",display:"flex",flexDirection:"column",paddingTop:"10vh"}} className="about-page-container">   
      <div className="about-page">
        <div className="about-title-container">
          <h2 className="about-title">
            One Page For Code <span style={{color:"#ff5555f1"}}> Collabration </span> 
            <br /> <span style={{color:"#ff55559c"}}> Execution </span> And <span style={{color:"#ff5555b5"}}> Sharing... </span>
          </h2>
        </div>

        {/* <div className="about-desc-container">
          <h3 className="about-desc" style={{color:"#b1afaf86"}}>
           No installations. No setup. Share a link, invite collaborators, and write code together 
          </h3>
          {/* <div className="about-decorative-circle"></div> */}
        {/* </div> */} 
      </div>
      <div style={{ display: 'flex', gap: '5rem', justifyContent: 'center', flexWrap: 'wrap', padding: '4rem 5vw' }}>
        <Card 
          title="Run Code Instantly" 
          description="Write, compile, and execute code in multiple languages directly from your browser without setting up any local environment."
        />
        <Card 
          imageSrc='/share.jpg'
          title="Share with a Single Link" 
          description="Generate a unique URL for your workspace. Send it to your teammates to start collaborating on the same codebase instantly."
        />
        <Card 
          imageSrc='/collab.png'
          title="Real-time Collaboration" 
          description="Write and edit code together with your team simultaneously. See changes as they happen without any lag or delays."
        />
      </div>
      <div style={{width:"100%",minHeight:"10vh",marginTop:"auto",borderTop:"1px solid #c5c6c724",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 5vw",color:"#c5c6c7",fontFamily:"monospace",fontWeight:"lighter"}}>
        <div>made by Adarsh raj</div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="https://www.linkedin.com/in/adarsh-raj-b31609381/" target="_blank" rel="noopener noreferrer" className="footer-link">
            <LinkedinIcon size={20} />
          </a>
          <a href="https://github.com/adarshraj077" target="_blank" rel="noopener noreferrer" className="footer-link">
            <GithubIcon size={20} />
          </a>
          <a href="https://www.instagram.com/_adarsh_raj____/" target="_blank" rel="noopener noreferrer" className="footer-link">
            <InstagramIcon size={20} />
          </a>
        </div>
      </div>
    </div>
    </>
  )
}

export default About