import { useState, useEffect, useCallback, RefObject } from 'react';

const useDetectScrolledToBottom = (node: RefObject<HTMLElement>, stopListen: boolean | undefined): boolean => {
    const [isBottom, setIsBottom] = useState(false);

    const handleScroll = useCallback(() => {
        if (node.current) {
            const { scrollTop, scrollHeight, clientHeight } = node.current;
            if (scrollTop + clientHeight === scrollHeight) {
                setIsBottom(true);
            } else {
                setIsBottom(false);
            }
        }
    }, [node]);

    useEffect(() => {
        if (node.current) {
            node.current.addEventListener("scroll", handleScroll);
            if (stopListen)
                node.current.removeEventListener("scroll", handleScroll);
        }

        return () => {
            if (node.current) {
                node.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [node, handleScroll, stopListen]);

    return isBottom;
};

export default useDetectScrolledToBottom;
