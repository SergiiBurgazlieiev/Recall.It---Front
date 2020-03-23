import React, { Component} from 'react';
import { Bar } from 'react-chartjs-2';

import styles from './ChartsBar.module.css';

class Charts extends Component {
    constructor(props){
        super(props);

        this.state = {
            chartAges: props.data
           
        }
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'bottom',
        age: 'Age',
        scale: {
            xAxes: [{
                scaleLabel: {
                    display:true,
                    labelString:'Age'
                },
                stacked: true
            }],
            yAxes: [{
                scaleLabel: {
                    display:true,
                    labelString:'Cases\' Count'
                },
                stacked: true,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    render(){
        let data = this.state.chartAges();
        return (
            <div className={styles.Container}>
                <div className={styles.Age}>
                    <Bar
                        data={data.totalAgesBoysAndGirls}
                        options= {{
                            scales: this.props.scale,
                            legend:{
                                display:this.props.displayLegend,
                                position:this.props.legendPosition
                            },
                            tooltips: {
                                mode: 'x-axis'
                            },
                            title:{
                                display:this.props.displayTitle,
                                text:this.props.age,
                                fontSize:20
                            },
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Charts;