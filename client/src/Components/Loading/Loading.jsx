import React from 'react';
import LOADING from "./loading.svg"
const Loading = () => {
    return <img src={LOADING} alt="loading"  width={200} style={{display: "grid", margin: "0 auto",justifyContent: "center"}}/>;
};

export default Loading;