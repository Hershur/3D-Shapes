import { useRef } from "react";
// import { randomWidthHeightGenerator } from "../utils";
import useDrawCube from "../hooks/useDrawCube";
import useWebsocket from "../hooks/useWebsocket";

function Cube () {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { data, error, loading } = useWebsocket('ws://localhost:5000');
    const {w, h} = data;

    useDrawCube(canvasRef, w, h);
   
    if(loading){
        return <div>Loading...</div>;
    }

    if(error){
        return <div>An unknown error occurred</div>;
    }

    return (
        <canvas ref={canvasRef} id="glcanvas"></canvas>
    );
};

export default Cube;
