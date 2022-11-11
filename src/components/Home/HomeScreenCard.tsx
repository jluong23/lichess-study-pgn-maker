import { Link } from "react-router-dom";

interface Props {
    title: string
    description: string
    imgSrc?: string
    imgAlt?: string
    onClickUrl: string
    /** is this page in development? */
    inDevelopment?: boolean 
}

export default function HomeScreenCard({title, description, imgSrc, imgAlt, onClickUrl, inDevelopment} : Props) {
    return (
        <div className="w-3/4 h-full flex flex-col items-center justify-center place-self-center bg-neutral-400 p-4">
            <div className="2xl:w-3/4">
                <img className="opacity-75 w-full h-full object-fill" src={imgSrc} alt={imgAlt}></img>
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
            {inDevelopment ? 
                <button disabled className="pill-button bg-red-400">Under construction, check again soon!</button>
                :
                <Link className="pill-button bg-blue-400" to={onClickUrl}>
                    Go
                </Link>
            }
        </div>

    )
}

