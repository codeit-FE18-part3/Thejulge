import { RefObject, useEffect } from 'react';

const useDropdownScroll = (listRef: RefObject<HTMLDivElement>, cursorIndex: number) => {
  useEffect(() => {
    const list = listRef.current;
    if (!list || cursorIndex < 0) return;

    const item = list.children[cursorIndex] as HTMLElement | undefined;
    if (!item) return;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    const viewTop = list.scrollTop;
    const viewBottom = viewTop + list.clientHeight;

    if (itemTop < viewTop) list.scrollTop = itemTop;
    else if (itemBottom > viewBottom) list.scrollTop = itemBottom - list.clientHeight;
  }, [cursorIndex, listRef]);
};

export default useDropdownScroll;
