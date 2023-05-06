import React, { useRef, useCallback, useMemo } from "react";

import styles from "./ReferencesItem.module.scss";

interface ListItem {
  title: string;
  description: string;
  url: string;
}

const ReferencesItem: React.FC<{
  listData: ListItem[];
  delete: (index: number) => void;
}> = (props) => {
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

  const deleteHandler = (index: number) => {
    props.delete(index);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}></div>
      </header>
      <div className={styles.container}>
        <ul className={styles.list}>
          {props.listData.map((item, index) => (
            <li
              draggable={true}
              className={styles.item}
              key={index}
              onMouseOver={(event) => mouseOverHandler(event, index)}
              onMouseLeave={(event) => mouseOutHandler(event, index)}
              ref={(element) => (listItemsRef.current[index] = element)}
            >
              <a
                href={item.url}
                className={styles.normal}
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  version="1.1"
                  id="L1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  enableBackground="new 0 0 100 100"
                  xmlSpace="preserve"
                >
                  <circle
                    fill="none"
                    stroke="#fff"
                    strokeWidth="6"
                    strokeMiterlimit="15"
                    strokeDasharray="14.2472,14.2472"
                    cx="50"
                    cy="50"
                    r="47"
                  >
                    <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      dur="5s"
                      from="0 50 50"
                      to="360 50 50"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </a>
              <div className={styles.info}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
              <p
                className={styles.delete}
                onClick={deleteHandler.bind(null, index)}
              >
                제거
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ReferencesItem;
