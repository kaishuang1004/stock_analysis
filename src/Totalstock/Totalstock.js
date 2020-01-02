import React, { Component } from 'react';
// import PlotlyChart from '../PlotlyChart/PlotlyChart';

class Totalstock extends Component {
  constructor() {
    super();
    this.state = {
      chartType: 'adRevenue',
      chartData: [],
      summaryData: undefined,
      timeRange: 30,
      topic: 'revenue',
      chartLayout: 'bar',
      timeFilter: 'daily',
      showReleaseHistory: 1,
      releaseHistory: { android: [], ios: [] }
    }
  }
  render() {
    return (
      <div className="AdsAnalysis">
        <div className="AdsAnalysisContent">
          {/* <PlotlyChart
            title="大盤指數"
            url={`https://kevinshuang.github.io/stock_analysis/data.json`}
            height={600}
          /> */}
        </div>
      </div>
    );
  }
}

export default Totalstock;