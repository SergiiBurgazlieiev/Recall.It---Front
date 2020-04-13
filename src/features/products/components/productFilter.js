import React from "react";

import styles from './productFilter.module.css';

export default ({ handleClick, prdLinks }) => {
  return (
    <div className={styles.ListContainer}>
      <ul className={styles.List}>
        {/* {prdLinks[0].map((item, key) => (
          <li key={key} onClick={e => handleClick(e)}>
            {item}
          </li>
        ))} */}
        <li className={styles.Item} onClick={e => handleClick(e)}>Recalls</li>
        <span className={styles.ItemSpan}/>
        <li className={styles.Item} onClick={e => handleClick(e)}>Emergency rooms</li>
        <span className={styles.ItemSpan}/>
        <li className={styles.Item} onClick={e => handleClick(e)}>Consumer reports</li>
      </ul>
    </div>
  );
};
