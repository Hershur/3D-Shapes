import { useRef } from "react";
// import { randomWidthHeightGenerator } from "../utils";
import useDrawCylinder from "../hooks/useDrawCylinder";
import useWebsocket from "../hooks/useWebsocket";

function Cylinder () {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { data, error, loading } = useWebsocket('ws://localhost:5000');
    const {hc, r} = data;

    useDrawCylinder(canvasRef, hc, r);
   
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

export default Cylinder;