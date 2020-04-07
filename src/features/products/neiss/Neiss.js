import React, { Component, Fragment } from "react";
import ChartsPie from "./charts/ChartsPie";
import ChartsBar from "./charts/ChartsBar";
import randomColor from "randomcolor";

class Neiss extends Component {
  //METHOD TO BUILD AGE CHART DATA
  chartAgeGetData = () => {
    const chartAges = {
      totalAgesBoysAndGirls: {
        datasets: [
          {
            data: this.props.dataChats.girlsCount,
            backgroundColor: randomColor({
              hue: "#48A1D9",
              luminosity: "light"
            }),
            label: "Count Of Girls' Cases",
            borderColor: "rgba(15, 50, 64, .8)",
            borderWidth: 0.5
          },
          {
            data: this.props.dataChats.boysCount,
            backgroundColor: randomColor({
              hue: "#48A1D9",
              luminosity: "light"
            }),
            label: "Count Of Boys' Cases",
            borderColor: "rgba(15, 50, 64, .8)",
            borderWidth: 0.5
          }
        ],

        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
      }
    };
    return chartAges;
  };
  //MOTHOD TO BUILD DIAGNOSIS AND DISPOSITION DATA
  getPieChartsData = () => {
    const dataChart = {
      dataDiagnosis: {
        labels: this.props.dataChats.diagnosisLabel,
        datasets: [
          {
            label: "Diagnosis",
            data: this.props.dataChats.diagnosisData,
            backgroundColor: randomColor({
              count: this.props.dataChats.diagnosisData.length,
              hue: "#48A1D9",
              luminosity: "light"
            }),
            borderColor: "rgba(15, 50, 64, .8)",
            borderWidth: 0.5
          }
        ]
      },
      dataDisposition: {
        labels: this.props.dataChats.dispositionLabel,
        datasets: [
          {
            label: "Disposition",
            data: this.props.dataChats.dispositionData,
            backgroundColor: randomColor({
              count: this.props.dataChats.dispositionData.length,
              hue: "#48A1D9",
              luminosity: "light"
            }),
            borderColor: "rgba(15, 50, 64, .8)",
            borderWidth: 0.5
          }
        ]
      }
    };
    return dataChart;
  };

  render() {
    return (
      <Fragment>
        <ChartsPie data={this.getPieChartsData} />
        <ChartsBar data={this.chartAgeGetData} />
      </Fragment>
    );
  }
}
export default Neiss;
