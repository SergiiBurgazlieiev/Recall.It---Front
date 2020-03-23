import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

import styles from './ChartsPie.module.css';

class Charts extends Component {
    constructor(props){
        super(props);

        this.state = {
            chartOne: props.data
            
        }
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'bottom',
        diagnosis: 'Diagnosis',
        disposition: 'Disposition',
        year: 'CPSC Case Number by Year',
    }


    render(){
        let data = this.state.chartOne();
        return (
            <div className={styles.Container}>
                <div className={styles.Diagnosis}>
                    <Pie 
                        data={data.dataDiagnosis}
                        options={{
                            title:{
                                display:this.props.displayTitle,
                                text:this.props.diagnosis,
                                fontSize:20
                            },
                            legend:{
                                display:this.props.displayLegend,
                                position:this.props.legendPosition
                            },
                            responsive: true
                        }}
                        
                    />
                </div>
                <div className={styles.Disposition}>
                    <Pie 
                        data={data.dataDisposition}
                        options={{
                            title:{
                                display:this.props.displayTitle,
                                text:this.props.disposition,
                                fontSize:20
                            },
                            legend:{
                                display:this.props.displayLegend,
                                position:this.props.legendPosition
                            },
                            responsive: true
                        }}
                    />
                </div>
            </div>
        );
    
    }
}

export default Charts;