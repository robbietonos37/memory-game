import React, { useEffect } from "react";
import { useState } from "react";

export default function Card({ catImageUrl, onClick }) {

    return <div className="card-container" onClick={onClick}>
        {console.log('what is this value: ' + catImageUrl)}
        <img src={catImageUrl} alt="Cat" />
    </div>
}