import { AppRouter } from "./providers/router";
import { MutableRefObject, useRef } from "react";
import { useInfiniteScroll } from "../shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";

function App() {
    // const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    // const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    //
    // useInfiniteScroll({
    //     callback: () => console.log('callback'),
    //     wrapperRef,
    //     triggerRef,
    // })

    return (
        <div
            // ref={wrapperRef}
            className='app'
        >
            <AppRouter />
            {/*<div style={{ 'height': '50px' }} ref={triggerRef} />*/}
        </div>
    );
}

export default App;
