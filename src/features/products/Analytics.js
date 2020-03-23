import React from 'react';
import data from './data.json';

import Neiss from './neiss/Neiss';
import styles from './Analytics.module.css';

const App = () => {
    return (
        <div className={styles.Analytics}>

            <Neiss data={data}/> 
            
        </div>
    );
}

export default App;