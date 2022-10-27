import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
    title: string
    description: string
    imgSrc?: string
    onClickUrl: string
}

export default function HomeScreenCard({title, description, imgSrc, onClickUrl} : Props) {
    return (
        <div className="w-3/4 h-full flex flex-col items-center justify-center place-self-center bg-pink-200 p-4">
            <img className="opacity-75 w-6/12" src={imgSrc}></img>
            <h2>{title}</h2>
            <p>{description}</p>
            <Link className="pill-button bg-blue-400" to={onClickUrl}>
                Go
            </Link>
        </div>

    )
}

