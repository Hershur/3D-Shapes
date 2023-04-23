import React, { useEffect, useRef } from "react";

function useDrawSphere (canvasRef: React.RefObject<HTMLCanvasElement>, r: number) {
    const requestRef = useRef<number>();
    
    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx || !canvasRef.current) return; 

        canvasRef.current.width = window.innerWidth;
		canvasRef.current.height = window.innerHeight;

        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#fff";
        
        let angleX = 0;
		let angleY = 0;
		let sphereRadius = r;

		function drawSphere() {
            if (!ctx || !canvasRef.current) return; 

			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

			// Set the center of the sphere to the middle of the canvasRef.current
			let centerX = canvasRef.current.width / 2;
			let centerY = canvasRef.current.height / 2;

			// Calculate the x, y, and z coordinates of each point on the sphere
			for (let lat = 0; lat <= 180; lat += 10) {
				let phi = lat * Math.PI / 180;

				for (let lon = 0; lon <= 360; lon += 10) {
					let theta = lon * Math.PI / 180;

					let x = sphereRadius * Math.sin(phi) * Math.cos(theta);
					let y = sphereRadius * Math.sin(phi) * Math.sin(theta);
					let z = sphereRadius * Math.cos(phi);

					// Rotate the sphere around the X and Y axes
					let cosX = Math.cos(angleX);
					let sinX = Math.sin(angleX);
					let cosY = Math.cos(angleY);
					let sinY = Math.sin(angleY);

					let rotatedY = y * cosX - z * sinX;
					let rotatedZ = z * cosX + y * sinX;
					let rotatedX = x * cosY - rotatedZ * sinY;
					rotatedZ = rotatedZ * cosY + x * sinY;

					// Convert 3D coordinates to 2D coordinates for the canvas
					let scale = 200 / (200 + rotatedZ);
					let x2d = centerX + rotatedX * scale;
					let y2d = centerY + rotatedY * scale;

					// Draw a filled circle at the 2D coordinates
					ctx.beginPath();
					ctx.arc(x2d, y2d, 3, 0, 2 * Math.PI);
					ctx.fill();
				}
			}

			// Rotate the sphere a little bit for the next frame
			angleX += 0.01;
			angleY += 0.02;

			// Request the next animation frame
			requestRef.current = requestAnimationFrame(drawSphere);
		}

		drawSphere();
    }, [canvasRef, r]);
}

export default useDrawSphere;