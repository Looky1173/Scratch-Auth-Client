import { useEffect, useState } from 'react';

const isBrowser = () => {
    return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
};

const useSSR = () => {
    const [browser, setBrowser] = useState(false);
    useEffect(() => {
        setBrowser(isBrowser());
    }, []);

    return {
        isBrowser: browser,
        isServer: !browser,
    };
};

export default useSSR;
