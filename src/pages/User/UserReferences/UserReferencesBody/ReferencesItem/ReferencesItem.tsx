import React, { useRef, useCallback, useMemo } from "react";

import styles from "./ReferencesItem.module.scss";

interface ListItem {
  title: string;
  description: string;
  url: string;
}

const ReferencesItem: React.FC<{
  listData: ListItem[];
}> = ({ listData }) => {
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const directions: Record<number, string> = useMemo(() => {
    return { 0: "top", 1: "right", 2: "bottom", 3: "left" };
  }, []);
  const classNames = useMemo(() => {
    return ["in", "out"]
      .map((p) => Object.values(directions).map((d) => styles[`${p}-${d}`]))
      .reduce((a, b) => a.concat(b));
  }, [directions]);

  const getDirectionKey = useCallback(
    (ev: React.MouseEvent, node: HTMLElement) => {
      const { width, height, top, left } = node.getBoundingClientRect();
      const l = ev.pageX - (left + window.pageXOffset);
      const t = ev.pageY - (top + window.pageYOffset);
      const x = l - (width / 2) * (width > height ? height / width : 1);
      const y = t - (height / 2) * (height > width ? width / height : 1);
      return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    },
    []
  );

  const update = (ev: React.MouseEvent, prefix: string, index: number) => {
    const node = listItemsRef.current[index];
    if (!node) return;
    node.classList.remove(...classNames);
    node.classList.add(
      styles[`${prefix}-${directions[getDirectionKey(ev, node)]}`]
    );
  };

  const mouseOverHandler = (ev: React.MouseEvent, index: number) => {
    update(ev, "in", index);
  };

  const mouseOutHandler = (ev: React.MouseEvent, index: number) => {
    update(ev, "out", index);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}></div>
      </header>
      <div className={styles.container}>
        <ul className={styles.list}>
          {listData.map((item, index) => (
            <li
              className={styles.item}
              key={index}
              onMouseOver={(event) => mouseOverHandler(event, index)}
              onMouseLeave={(event) => mouseOutHandler(event, index)}
              ref={(element) => (listItemsRef.current[index] = element)}
            >
              <a
                href={item.url}
                className={styles.normal}
              >
                <svg
                  viewBox="0 0 80 76"
                  x="0px"
                  y="0px"
                >
                  <g>
                    <path d="M 68.9708 24.8623 L 60.4554 2.3018 C 59.9641 0.7017 58.1628 -0.2583 56.5252 0.3817 L 1.9822 20.2222 C 0.3822 20.7022 -0.4179 22.6222 0.2222 24.2223 L 8.8624 47.7797 L 8.8624 35.1484 C 8.8624 29.5024 13.3425 24.8623 18.8857 24.8623 L 32.9442 24.8623 L 50.63 12.862 L 60.7829 24.8623 L 68.9708 24.8623 L 68.9708 24.8623 ZM 77.098 32.0625 L 18.8857 32.0625 C 17.2512 32.0625 16.0625 33.4511 16.0625 35.1484 L 16.0625 72.8491 C 16.0625 74.5477 17.2512 75.9375 18.8857 75.9375 L 77.098 75.9375 C 78.742 75.9375 79.9376 74.5477 79.9376 72.8491 L 79.9376 35.1484 C 79.9376 33.4511 78.742 32.0625 77.098 32.0625 L 77.098 32.0625 ZM 73.0626 68.0625 L 23.9375 68.0625 L 23.9375 61.0852 L 31.4704 43.7232 L 42.7696 57.6777 L 53.4138 46.8062 L 67.1695 41.9375 L 73.0626 55.0815 L 73.0626 68.0625 L 73.0626 68.0625 Z" />
                  </g>
                </svg>
              </a>
              <div className={styles.info}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ReferencesItem;
