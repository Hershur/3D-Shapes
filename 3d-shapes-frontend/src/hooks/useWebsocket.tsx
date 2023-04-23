import { useState } from "react";
import { RandomDimensions } from "../types";

function useWebsocket (webSocketUrl: string) {
    const [data, setData] = useState<RandomDimensions>({w: 0, h: 0, r: 0, hc: 0});
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const socket = new WebSocket(webSocketUrl);

    // Connection opened
    socket.addEventListener("open", (event) => {
        socket.send("Hello Server!");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
        try {
            setData(JSON.parse(event.data));
            setLoading(false);
        } catch (error) {
            socket.close();
        }
    });
    
    // check for errors
    socket.addEventListener("error", (error) => {
        setLoading(false);
        setError(error)
        socket.close();
    });

    return { data, error, loading };

}

export default useWebsocket;