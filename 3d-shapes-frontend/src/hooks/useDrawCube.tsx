import React, { useEffect, useRef } from "react";
import { POINT3D } from "../utils";
import { COLOR_BG_DEFAULT, COLOR_CUBE, SPEED_Z, SPEED_X, SPEED_Y } from "../utils/constants";

function useDrawCube (canvasRef: React.RefObject<HTMLCanvasElement>, w: number, h: number) {
    const requestRef = useRef<number>();

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx || !canvasRef.current) return; 

        canvasRef.current.width = window.innerWidth;
		canvasRef.current.height = window.innerHeight;

        // colours and lines
        ctx.fillStyle = COLOR_BG_DEFAULT;
        ctx.strokeStyle = COLOR_CUBE;
        ctx.lineWidth = w / 100;
        ctx.lineCap = "round";

        // cube parameters
        const cx = w / 2;
        const cy = h / 2;
        const cz = 0;
        const size = h / 4;

        const vertices: POINT3D[] = [
            new POINT3D(cx - size, cy - size, cz - size),
            new POINT3D(cx + size, cy - size, cz - size),
            new POINT3D(cx + size, cy + size, cz - size),
            new POINT3D(cx - size, cy + size, cz - size),
            new POINT3D(cx - size, cy - size, cz + size),
            new POINT3D(cx + size, cy - size, cz + size),
            new POINT3D(cx + size, cy + size, cz + size),
            new POINT3D(cx - size, cy + size, cz + size)
        ];
        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0], // back face
            [4, 5], [5, 6], [6, 7], [7, 4], // front face
            [0, 4], [1, 5], [2, 6], [3, 7] // connecting sides
        ];

        // set up the animation loop
        let timeDelta, timeLast = 0;
        requestRef.current = requestAnimationFrame(render);

        function render(timeNow: number) {
            if (!ctx) return; 

            // calculate the time difference
            timeDelta = timeNow - timeLast;
            timeLast = timeNow;

            // background
            ctx.fillRect(0, 0, w, h);

            // rotate the cube along the z axis
            let angle = timeDelta * 0.001 * SPEED_Z * Math.PI * 2;
            for (let v of vertices) {
                let dx = v.x - cx;
                let dy = v.y - cy;
                let x = dx * Math.cos(angle) - dy * Math.sin(angle);
                let y = dx * Math.sin(angle) + dy * Math.cos(angle);
                v.x = x + cx;
                v.y = y + cy;
            }

            // rotate the cube along the x axis
            angle = timeDelta * 0.001 * SPEED_X * Math.PI * 2;
            for (let v of vertices) {
                let dy = v.y - cy;
                let dz = v.z - cz;
                let y = dy * Math.cos(angle) - dz * Math.sin(angle);
                let z = dy * Math.sin(angle) + dz * Math.cos(angle);
                v.y = y + cy;
                v.z = z + cz;
            }

            // rotate the cube along the y axis
            angle = timeDelta * 0.001 * SPEED_Y * Math.PI * 2;
            for (let v of vertices) {
                let dx = v.x - cx;
                let dz = v.z - cz;
                let x = dz * Math.sin(angle) + dx * Math.cos(angle);
                let z = dz * Math.cos(angle) - dx * Math.sin(angle);
                v.x = x + cx;
                v.z = z + cz;
            }

            // draw each edge
            for (let edge of edges) {
                ctx.beginPath();
                ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
                ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
                ctx.stroke();
            }

            // call the next frame
            requestRef.current = requestAnimationFrame(render);
        }

        return () => cancelAnimationFrame(requestRef.current as number);
        
      }, [canvasRef, h, w]);
}

export default useDrawCube;