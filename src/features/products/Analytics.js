import React from "react";
import Neiss from "./neiss/Neiss";

import styles from "./Analytics.module.css";

const App = ({ dataChats }) => {
  return (
    <div className={styles.Analytics}>
      <Neiss dataChats={dataChats} />
    </div>
  );
};

export default App;
