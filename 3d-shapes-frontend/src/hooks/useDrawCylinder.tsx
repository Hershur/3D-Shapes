import { useEffect, useRef } from "react";


function useDrawCylinder (canvasRef: React.RefObject<HTMLCanvasElement>, hc: number, r: number) {
    const requestRef = useRef<number>();

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx || !canvasRef.current) return; 

        canvasRef.current.width = window.innerWidth;
		canvasRef.current.height = window.innerHeight;

        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#fff";
        // ctx.lineCap = "round";



        // Set the cylinder properties
        const radius = r; // The radius of the cylinder
        const height = hc; // The height of the cylinder
        const slices = 20; // The number of slices in the cylinder
        const rotationSpeed = 0.01; // The rotation speed of the cylinder

        // Set the initial rotation angle
        let angle = 0;

        // Define the function to draw a cylinder slice
        function drawSlice(x1: number, y1: number, x2: number, y2: number) {
            if (!ctx) return; 
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x2, y2 + height);
            ctx.lineTo(x1, y1 + height);
            ctx.closePath();
            ctx.fill();
        }

        // Define the function to draw the cylinder
        function render() {
            if (!ctx || !canvasRef.current) return; 

            // Clear the canvasRef.current
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            
            // Set the origin to the center of the canvasRef.current
            ctx.translate(canvasRef.current.width/2, canvasRef.current.height/2);
            
            // Rotate the canvasRef.current based on the current angle
            ctx.rotate(angle);
            
            // Draw the cylinder slices
            for (let i = 0; i < slices; i++) {
                const angle1 = i * 2 * Math.PI / slices;
                const angle2 = (i+1) * 2 * Math.PI / slices;
                const x1 = radius * Math.cos(angle1);
                const y1 = radius * Math.sin(angle1);
                const x2 = radius * Math.cos(angle2);
                const y2 = radius * Math.sin(angle2);
                
                drawSlice(x1, y1, x2, y2);
                drawSlice(x1, y1, x1, y1 + height);
                drawSlice(x2, y2, x2, y2 + height);
            }
            
            // Reset the canvasRef.current transformation
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            
            // Update the angle for the next frame
            angle += rotationSpeed;
            
            // Request the next frame
            requestRef.current = requestAnimationFrame(render);
        }

        // Call the render function to start the animation
        render();
    }, [canvasRef, hc, r]);
}

export default useDrawCylinder