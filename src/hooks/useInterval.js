import { useRef, useEffect } from "react";
import accurateSetInterval from "../lib/accurateSetInterval";

export default function useInterval (callback, delay) {
    let savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        let interval;

        const tick = () => {
            savedCallback.current();
        };

        if (delay !== null) {
            interval = accurateSetInterval(tick, delay);
            return () => interval.cancel();
        } else if (interval) {
            return () => interval.cancel();
        }
    }, [delay]);
}