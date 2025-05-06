import { useEffect, useCallback } from "react";

/**
 * Custom hook to handle infinite scroll.
 * @param {object} ref - The reference to the scrolling container.
 * @param {boolean} isLoading - Whether data is currently loading.
 * @param {object} pagination - Pagination object containing `has_next_page`.
 * @param {function} loadMore - Function to load more data.
 */
const useInfiniteScroll = (ref, isLoading, pagination, loadMore) => {
  const handleScroll = useCallback(() => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        !isLoading &&
        pagination?.has_next_page
      ) {
        loadMore();
      }
    }
  }, [loadMore, isLoading, pagination]);

  useEffect(() => {
    const container = ref.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll, ref]);
};

export default useInfiniteScroll;
