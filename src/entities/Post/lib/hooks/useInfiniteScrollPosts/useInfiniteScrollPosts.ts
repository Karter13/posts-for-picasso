import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-cool-inview';
import { postAPI } from "entities/Post/index";
import { IPost } from "entities/Post/model/types/post";

const LIMIT_POSTS_ON_POSTS_LIST = 8;

const useInfiniteScrollPosts = () => {
    const [page, setPage] = useState(1);
    const [combinedData, setCombinedData] = useState<IPost[]>([]);

    const [
        trigger,
        {

            data: { data: currentData = [], ...pagination } = {},
            isLoading,
            isFetching,
            error,
        },
    ]: any = postAPI.endpoints.fetchAllPosts.useLazyQuery();

    const { observe } = useInView({
        threshold: 0.8,
        onEnter: ({ unobserve }) => {
            unobserve();
            if (pagination?.next_page_url !== null && !isFetching) {
                setPage(page => page + 1);
            }
        },
    });

    useEffect(() => {
        const result = trigger({
            page,
            limit: LIMIT_POSTS_ON_POSTS_LIST,
        })
            .unwrap()
            .then((data: IPost[]) => {
                return setCombinedData([...combinedData, ...(data ?? [])])
            })
            .catch(console.error);
        return result.unsubscribe;
    }, [trigger, page]);

    const refresh = useCallback(() => {
        setPage(1);
    }, []);

    return {
        combinedData,
        currentData,
        page,
        error,
        refresh,
        isLoading,
        isFetching,
        itemRef: observe,
    };
};

export default useInfiniteScrollPosts;
