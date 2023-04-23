import { useRef } from "react";
// import { randomWidthHeightGenerator } from "../utils";
import useDrawSphere from "../hooks/useDrawSphere";
import useWebsocket from "../hooks/useWebsocket";

function Sphere () {
    const canvasRef = useRef<HTMLCanvasElement>(null);
	const { data, error, loading } = useWebsocket('ws://localhost:5000');
    const {r} = data;
	
	useDrawSphere(canvasRef, r);

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

export default Sphere;