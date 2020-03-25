import React, { Component, Fragment } from 'react';
import ChartsPie from './charts/ChartsPie';
import ChartsBar from './charts/ChartsBar';
import randomColor from 'randomcolor';
import { scrapboyandgirlValues, scrapdiagnosisdispositionValues } from '../../../apis/product';
import { getData } from '../../Layout/utils';
//This import needed in order to recieve 'category_aprox';
import get from 'lodash/get';
import { scrapCategoryApprox, scrapCategoryDetails } from '../../../apis/product';
import { parseQueryString } from '../../../utils/index';

class Neiss extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: {},
            boysCount: [],
            girlsCount:[],
            diagnosisLabel:[],
            diagnosisData:[],
            dispositionLabel:[],
            dispositionData:[],
        }
    }

    // getCategoryAproxData = async () => {
    //     let { category } = parseQueryString();
    //     let categories = category.split('_');
    //     let categoryDetails = '';
    //     let categoryAprox;
    //     for (let i = 0; i < categories.length; i++) {
    //         categoryAprox = await scrapCategoryApprox({
    //         category: decodeURI(category)
    //         }).then(response => {
    //             console.log(response);
    //             this.setState({
    //                 category: {'category': response.category_approx }
    //             });
    //         }).catch(err => {
    //             console.log(err);
    //         });

    //         categoryDetails = await scrapCategoryDetails({
    //         category: get(categoryAprox, 'category_approx', '')
    //         });
    //         if (get(categoryDetails, 'results_category', []).length > 0) break;
    //     }
    //     return categoryAprox;
    // };

    async componentDidMount(){
        const result = getData();
        console.log(result, 'RESULT OF CALLING GET DATA IN NEISS');
        //await this.getCategoryAproxData(); 


        Promise.all([scrapboyandgirlValues(this.state.category), scrapdiagnosisdispositionValues(this.state.category)])
        .then(([barChartValues, pieChartValue])=>{
            this.setState({
                boysCount: barChartValues.boy_values,
                girlsCount: barChartValues.girl_values,
                diagnosisLabel: pieChartValue.diagnosis_values[0],
                diagnosisData: pieChartValue.diagnosis_values[1],
                dispositionLabel: pieChartValue.disposition_values[0],
                dispositionData: pieChartValue.disposition_values[1]
            });
        })
        .catch(e => {
            console.log(e);
        }); 
    }

    componentDidUpdate(){
        this.getPieChartsData();
        this.chartAgeGetData();
    }

    //METHOD TO BUILD AGE CHART DATA 
    chartAgeGetData = () => {
        const chartAges = {
            totalAgesBoysAndGirls: {
                datasets: [{
                    data: this.state.girlsCount,
                    backgroundColor: randomColor({
                        hue: '#48A1D9',
                        luminosity: 'light'
                    }),
                    label: 'Count Of Girls\' Cases',
                    borderColor: 'rgba(15, 50, 64, .8)',
                    borderWidth: .5
                    }, {
                    data: this.state.boysCount,
                    backgroundColor: randomColor({
                        hue: '#48A1D9',
                        luminosity: 'light'
                        
                    }),
                    label: 'Count Of Boys\' Cases',
                    borderColor: 'rgba(15, 50, 64, .8)',
                    borderWidth: .5
                }],

                labels: ['1','2','3','4','5','6','7','8', '9', '10', '11']
            }
        }
        return chartAges;
    }
    //MOTHOD TO BUILD DIAGNOSIS AND DISPOSITION DATA
    getPieChartsData = () => {
        const dataChart = {
            dataDiagnosis:{
                labels: this.state.diagnosisLabel,
                datasets:[
                    {
                        label:'Diagnosis',
                        data:this.state.diagnosisData, 
                        backgroundColor: randomColor({
                            count: this.state.diagnosisData.length,
                            hue: '#48A1D9',
                            luminosity: 'light'
                            
                        }),
                        borderColor: 'rgba(15, 50, 64, .8)',
                        borderWidth: .5
                    }
                ]
            },
            dataDisposition:{
                labels: this.state.dispositionLabel,
                datasets:[
                    {
                        label:'Disposition',
                        data: this.state.dispositionData,
                        backgroundColor: randomColor({
                            count: this.state.dispositionData.length, 
                            hue: '#48A1D9',
                            luminosity: 'light'
                            
                        }),
                        borderColor: 'rgba(15, 50, 64, .8)',
                        borderWidth: .5
                    }
                ]
            }
        } 
        return dataChart;
    }

    render(){
        return(
            <Fragment>
                <ChartsPie data={this.getPieChartsData} />
                <ChartsBar data={this.chartAgeGetData} />
            </Fragment>
        );
    }
}
export default Neiss;

