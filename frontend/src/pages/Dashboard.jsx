
import { Link } from "react-router-dom"

export default function Dashboard() {
  return (
    <>
      <div style={{marginTop: "250px" , marginLeft: "250px" ,  padding: "30px" , width: "50vw" , fontSize: "19px"}}>
        <h1 style={{color: "red" , marginBottom: "10px"}}>Sorry!</h1>
        <p>
            The account creation and CV management feature is currently
          unavailable and under development; you can create a CV here <Link to="/improved" style={{color: "#3986ce"}}>create resume</Link>
        </p>
      </div>
    </>
  )
}
