import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

interface IuseIntersectionObserverProps {
  threshold?: number;
  hasNextPage?: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: IuseIntersectionObserverProps) => {
  // 관찰할 요소
  const [target, setTarget] = useState<HTMLDivElement | undefined | null>(null);
  console.log(target);

  const observerCb: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          console.log('start');
          fetchNextPage();
        }
      });
    },
    [hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(observerCb, {
      threshold,
    });
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [observerCb, threshold, target]);

  return { setTarget };
};
