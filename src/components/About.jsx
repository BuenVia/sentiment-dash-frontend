import Markdown from "react-markdown"
import about from "../about"

const About = () => {


    return (
        <div>

                <Markdown>            
                {about}
        </Markdown>


    </div>
        )
    }
    
    export default About