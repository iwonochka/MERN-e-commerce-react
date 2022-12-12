import "./About.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {IoLogoJavascript} from "react-icons/io"
import {GrReactjs} from "react-icons/gr"
import {SiExpress} from "react-icons/si"
import {FaNode} from "react-icons/fa"
import {SiMongodb} from "react-icons/si"
import {BsBootstrapFill} from "react-icons/bs"

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header"><h1>About the project</h1></div>
      <Row>
        <Col sm={12} md={4} lg={4} className="about-card" style={{backgroundColor: "black", color: "white"}}>
          <h4>Final project of Ironhack full-stack coding bootcamp in Berlin <br/> built in Dec 2022</h4>
        </Col>
        <Col sm={12} md={4} lg={4} className="about-card" style={{backgroundColor: "white", color: "black"}} >
          <h4>Tech stack:</h4>
          <div className="about-icons-container">
            <div>
              <IoLogoJavascript className="about-icon"/>
              <p>JavaScript</p>
            </div>
            <div>
              <GrReactjs className="about-icon"/>
              <p>React</p>
            </div>
            <div>
              <SiExpress className="about-icon"/>
              <p>Express</p>
            </div>
            <div>
              <FaNode className="about-icon"/>
              <p>Node.js</p>
            </div>
            <div>
              <SiMongodb className="about-icon"/>
              <p>Mongo DB</p>
            </div>
            <div>
              <BsBootstrapFill className="about-icon"/>
              <p>Bootstrap</p>
            </div>
          </div>
        </Col>
        <Col sm={12} md={4} lg={4} className="about-card" style={{backgroundColor: "#FFEEC4", color: "black"}}>
          <h4>Created by <br/> <b>Iwona Behnke</b></h4>
        </Col>
      </Row>
    </div>
  )
}

export default About
