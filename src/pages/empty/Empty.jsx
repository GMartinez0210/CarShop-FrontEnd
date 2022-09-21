import "./empty.css"

import emojiSad from "../../assets/Nothing/emoji-sad.svg"

const gearWide = "bi bi-gear-wide"
const gearWideConnected = "bi bi-gear-wide-connected"
const emojiFrown = "bi bi-emoji-frown"

function Nothing(props) {
    return (
        <div className="nothing">
            <div className="nothing-emojies">
                <img src={emojiSad} alt="emoji-sad" loading="lazzy"/>
                <i className={emojiFrown}></i>
            </div>

            <div className="nothing-message">
                <h1 className="nothing-message-title">
                    {props.title || "Nothing to show"}
                </h1>
                <p className="nothing-message-paragraph">
                    {props.paragraphTop || "We are still working on this section"}
                </p>
                <p className="nothing-message-paragraph">
                    {props.paragraphBottom || "Please, visit the other views"}
                </p>
            </div>

            <div className="nothing-working-container">
                <div className="nothing-working-col mt-5">
                    <i className={gearWideConnected}></i>
                    <i className={gearWide}></i>
                </div>
                <div className="nothing-working-col mb-5">
                    <i className={gearWide}></i>
                    <i className={gearWideConnected}></i>
                </div>
            </div>
        </div>
    )
}

export default Nothing