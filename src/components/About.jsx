import Markdown from "react-markdown"
import about from "../about"

const About = () => {


    return (
        <div className="row mt-5">
        <div className="col-4 col-sm-2"></div>
        <div className="col-4 col-sm-8">
            <Markdown>            
                {about}
            </Markdown>
        </div>
        <div className="col-4 col-sm-2"></div>
        </div>
        )
    }
    
    export default About