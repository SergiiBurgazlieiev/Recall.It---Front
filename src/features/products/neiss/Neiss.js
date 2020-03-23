import React, { Component, Fragment } from 'react';
import ChartsPie from './charts/ChartsPie';
import ChartsBar from './charts/ChartsBar';
import randomColor from 'randomcolor';
import { uniqAndCountFunc, groupOtherFunc, helperToLable } from '../helpers/helpers';
//This import needed in order to recieve 'category_aprox';
import get from 'lodash/get';
import { scrapCategoryApprox, scrapCategoryDetails } from '../../../apis/product';
import { parseQueryString } from '../../../../src/utils/index';


class Neiss extends Component {
    constructor(props){
        super(props);

        this.state = {
            dataSet:[],
            allTypesOfDiagnosis:{},
            allTypesOfDisposition: {},
            suggestions: [],
            searchTerm: ''
        }
    }

    //LOOKING FOR CHANGE OF AN INPUT, RETRIEVE SEARCH TERM
    getSuggestions = () => {
        /*
            This function needs to be added in orrder to make evryting work. 
            2. Insted of data.json file fetch this data from data base. and assign to this.setState({dataSet: response.data});  
        */
        const { dataSet, searchTerm } = this.state;
        let value = searchTerm;
        let suggestions = [];

        if(value.length > 0){
            const regex = new RegExp(`${value}`, 'i');
            suggestions = dataSet.filter(term => term.Narrative_1.match(regex));
        }

        this.setState({ suggestions });
    } 

    getCategoryAproxData = async () => {
        let { category } = parseQueryString();
        let categories = category.split('_');
        let categoryDetails = '';
        let categoryAprox;
        for (let i = 0; i < categories.length; i++) {
            categoryAprox = await scrapCategoryApprox({
            category: decodeURI(category)
            }).then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            });

            categoryDetails = await scrapCategoryDetails({
            category: get(categoryAprox, 'category_approx', '')
            });
            if (get(categoryDetails, 'results_category', []).length > 0) break;
        }
        return categoryAprox;
    };

    componentDidMount(){
        //Fetch data from MongoDB here.
        let result = this.getCategoryAproxData();  
        this.getSuggestions();
        this.getPieChartsData();
        this.chartAgeGetData();

        this.setState({
            allTypesOfDiagnosis:{
                50: 'Amputation',
                65: 'Anoxia',
                42: 'Aspirated foreign object',
                72: 'Avulsion',
                48: 'Burns, scald (from hot liquids or steam)',
                51: 'Burns, thermal (from flames or hot surface)',
                49: 'Burns, chemical (caustics, etc.)',
                73: 'Burns, radiation (includes all cell damage by ultraviolet, x-rays, microwaves, laser beam, radioactive materials, etc.)',
                46: 'Burns, electrical',
                47: 'Burns, not specified',
                52: 'Concussions',
                53: 'Contusions, Abrasions',
                54: 'Crushing',
                60: 'Dental injury',
                74: 'Dermatitis, Conjunctivitis',
                55: 'Dislocation',
                67: 'Electric shock',
                56: 'Foreign body',
                57: 'Fracture',
                58: 'Hematoma',
                66: 'Hemorrhage',
                41: 'Ingested foreign object',
                62: 'Internal organ injury',
                59: 'Laceration',
                61: 'Nerve damage',
                68: 'Poisoning',
                63: 'Puncture',
                64: 'Strain or Sprain',
                69: 'Submersion (including Drowning)',
                71: 'Other'
            },
            allTypesOfDisposition: {
                1: 'Treated and released, or examined and released without treatment',
                2: 'Treated and transferred to another hospital',
                4: 'Treated and admitted for hospitalization (within same facility)',
                5: 'Held for observation (includes admitted for observation)',
                6: 'Left without being seen/Left against medical advice',
                8: 'Fatality, including DOA, died in the ED',
                9: 'Other'
            },
            searchTerm: result.category_approx
            //dataSet: response.data NEED TO BE FETCH FROM MONGO DB
        });
    }

    componentDidUpdate(){
        this.getPieChartsData();
        this.chartAgeGetData();
    }

    //METHOD TO BUILD AGE CHART DATA 
    chartAgeGetData = () => {
        const { suggestions } = this.state;
        console.log('Age Chart Data',suggestions);
        let uniqueAgeBoys =[];
        let uniqueAgeGirls = [];
        let chartAges = {};
        //FILTERING OUT CASES, WHICH ARE EQUAL AND OVER 12 YEARS OLD
        let underTwelve = suggestions.filter(el => el["Age"] < 12);
        let boys = underTwelve.filter(el => el["Sex"] === 1);
        let girls = underTwelve.filter(el => el["Sex"] === 2);

        uniqueAgeBoys = uniqAndCountFunc(boys, 'Age');
        uniqueAgeGirls = uniqAndCountFunc(girls, 'Age');
        
        let boysCount = uniqueAgeBoys[0];
        let girlsCount = uniqueAgeGirls[0];

        chartAges = {
            totalAgesBoysAndGirls: {
                datasets: [{
                    data: girlsCount,
                    backgroundColor: randomColor({
                        hue: '#48A1D9',
                        luminosity: 'light'
                        
                    }),
                    label: 'Count Of Girls\' Cases',
                    borderColor: 'rgba(15, 50, 64, .8)',
                    borderWidth: .5
                }, {
                    data: boysCount,
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
        const {suggestions, allTypesOfDiagnosis, allTypesOfDisposition} = this.state;
        console.log('SUGGESTIONS FROM PIE CHARTS', suggestions);
        let resultDiagnosis =[];
        let resultDisposition =[];
        let diagnosisWithGroupOfOther =[];
        let dispositionWithGroupOfOther=[];
    
        let diagLabel = [];
        let dispLabel =[];

        let dataChart ={};
        let countOfDiag = 0;
        let countOfDisp = 0;
            
        if(suggestions.length > 0){
            // DIAGNOSIS DATA 
            resultDiagnosis = uniqAndCountFunc(suggestions, 'Diagnosis');
            diagnosisWithGroupOfOther = groupOtherFunc (resultDiagnosis[0], resultDiagnosis[1]);
            diagLabel = helperToLable(diagnosisWithGroupOfOther[0], allTypesOfDiagnosis);
            diagnosisWithGroupOfOther[1].length > 0 ? countOfDiag = diagnosisWithGroupOfOther[1].length : countOfDiag= 0;

            // DISPOSITION DATA
            resultDisposition = uniqAndCountFunc(suggestions, 'Disposition');
            dispositionWithGroupOfOther = groupOtherFunc (resultDisposition[0], resultDisposition[1]);
            dispLabel = helperToLable(dispositionWithGroupOfOther[0], allTypesOfDisposition);
            dispositionWithGroupOfOther[1].length > 0 ? countOfDisp = dispositionWithGroupOfOther[1].length : countOfDisp = 0; 
            
        }
        
        dataChart = {
            dataDiagnosis:{
                labels: diagLabel,
                datasets:[
                    {
                        label:'Diagnosis',
                        data: diagnosisWithGroupOfOther[1],
                        backgroundColor: randomColor({
                            count: countOfDiag, 
                            hue: '#48A1D9',
                            luminosity: 'light'
                            
                        }),
                        borderColor: 'rgba(15, 50, 64, .8)',
                        borderWidth: .5
                    }
                ]
            },
            dataDisposition:{
                labels: dispLabel,
                datasets:[
                    {
                        label:'Disposition',
                        data: dispositionWithGroupOfOther[1],
                        backgroundColor: randomColor({
                            count: countOfDisp, 
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
        console.log('SUGESSTIONSSSSSSSSSSSSSSSSSSS',this.suggestions);
        return(
            <Fragment>
                <ChartsPie 
                    data={this.getPieChartsData} 
                />
                <ChartsBar 
                    data={this.chartAgeGetData}
                />
            </Fragment>
        );
    }
}

export default Neiss;