import React, { Component } from 'react';
import Chart from '../Chart/Chart';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Charted from '../Chart';
import { TypeChooser } from "react-stockcharts/lib/helper";
import { getData } from "../utils"

class StockList2 extends Component {
  constructor() {
    super();
    this.state = {
      timeRange: 365,
      code: 1101,
      coutryFlag: {},
      money: {
        收盤價:true,
        flurry: true,
        開盤價: true,
        marketPlace: true
      },
      data: null,
      platform: '',
      adType: '',
      chartType: 'adsAnalysis',
      StockData: [],
      chartData: [],
      selected: -1,
      done: [],
    }
    this.onTimeRangeChange.bind(this);
  }

  componentDidMount() {
    getData({code: this.state.code}).then(data => {
			this.setState({ data: data })
    })
    console.log(this.state.data)
    // this.fetchCountryFlag();
    this.fetchAlertData();
  }
  
  onTimeRangeChange(timeRange) {
    this.fetchChartData({
      code: this.state.code,
      // platform: this.state.platform,
      // adType: this.state.adType,
      timeRange: +timeRange
    });
  }

  fetchAlertData() {
    fetch(`https://kaishuang1004.github.io/stock_analysis/file.json`)
      .then(res => res.json())
      .then(data => {
        if (data.status === false && data.authStatus === false) {
          window.googleToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
          this.fetchAlertData();
          return;
        }
        this.setState({
          StockData: data
        });
      });
  }

  fetchChartData({ code, selected}) {
    let url = `https://kaishuang1004.github.io/stock_analysis/file_${code}.json`;
    if (this.props.old) {
      url = `https://kaishuang1004.github.io/stock_analysis/file_${code}.json`
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.status === false && data.authStatus === false) {
          window.googleToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
          this.fetchChartData({ code, selected});
          return;
        }
        this.setState({
          code: code,
          chartData: data,
          selected: selected
        });
      });
  }
  toggleLine(key) {
    const { money } = this.state
    money[key] = !money[key];
    this.setState({
      money: money
    })
  }
  render() {
    if (this.state.data == null) {
			return <div>Loading...</div>
    }
    const { StockData, chartData, timeRange, chartType, selected, predictValue, data } = this.state;
    const chartHeight = 400;
    const adjustPredictLine = (chartData) => {
      const length = chartData.length;
      if (length === 0) {
        return [];
      }
      let data = [...chartData];
      // data.map((ele, index) => {
      //   ele.network.admob.fittedvalues = index === data.length - 1 ? ele.network.admob.eCPM : undefined;
      //   ele.network.fan.fittedvalues = index === data.length - 1 ? ele.network.fan.eCPM : undefined;
      //   ele.network.flurry.fittedvalues = index === data.length - 1 ? ele.network.flurry.eCPM : undefined;
      //   ele.network.marketplace.fittedvalues = index === data.length - 1 ? ele.network.marketplace.eCPM : undefined;
      //   return ele;
      // });
      // const predictDate = new Date(data[length - 1].date);
      // predictDate.setDate(predictDate.getDate() + 1);
      // data.push({
      //   date: `${predictDate.getFullYear()}/${predictDate.getMonth() + 1}/${predictDate.getDate()}`,
      //   network: predictValue
      // });
      return data;
    }
    return (
      <div
        className="AdsAnalysis"
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: window.innerHeight * 0.9
        }}
      >
        {/* {<div className="AdsAnalysisContent">
          <Chart data={adjustPredictLine(chartData)}
            收盤價={this.state.money.收盤價}
            flurry={this.state.money.flurry}
            開盤價={this.state.money.開盤價}
            marketPlace={this.state.money.marketPlace}
            revenue={this.props.revenue || this.state.revenue}
            type={chartType}
            timeRange={timeRange}
            predictLine={true}
            width={this.props.width}
            height={this.props.height || chartHeight}
            toggleLine={key => { this.toggleLine(key); }}
          />
        </div>} */}
        
        <TypeChooser>
           {type => <Charted type={type} data={this.state.data} />}
        </TypeChooser>
        
        { 
          !this.props.hideTable && (
            <div className="AdsAnalysisContent">
              <ReactTable
                style={{
                  width: '90%',
                  height: '300px'
                }}
                defaultPageSize={10}
                // showPagination={false}
                // showPageSizeOptions={false}
                pageSize={[...StockData].length}
                data={[...StockData]}
                columns={[
                  {
                    Header: '證券代號',
                    columns: [{
                      Header: '證券代號',
                      id: '證券代號',
                      accessor: '證券代號',
                      Cell: props => <span>{props.value}</span>,
                      minWidth: 20,
                      filterMethod: (filter, row) => {
                        console.log(row, filter)
                        return row.證券代號.toLowerCase().indexOf(filter.value.toLowerCase()) !== -1;
                      },
                    }],
                  },
                  // {
                  //   Header: '證券代號',
                  //   columns: [{
                  //     Header: '證券代號',
                  //     id: 'exchange_alert',
                  //     accessor: '證券代號',
                  //     Cell: props => <span>{props.value}</span>,
                  //     minWidth: 20,
                  //     filterMethod: (filter, row) => {
                  //       if (filter.value) {
                  //         return true;
                  //       }
                  //       return row[filter.id];
                  //     },
                  //     Filter: ({ filter, onChange }) => {
                  //       if (!filter) {
                  //         return <i className="material-icons" onClick={event => onChange(false)} style={{ cursor: 'pointer', fontSize: '20px' }} >star_border</i>;
                  //       } else {
                  //         return filter.value ? <i className="material-icons" onClick={event => onChange(false)} style={{ cursor: 'pointer', fontSize: '20px' }} >star_border</i> : <i className="material-icons" style={{ color: '#ffce31', cursor: 'pointer', fontSize: '20px' }} onClick={event => onChange(true)} >star</i>
                  //       }
                  //     }
                  //   }],
                  // },
                  {
                    Header: '證券名稱',
                    columns: [{
                      id: '證券名稱',
                      Header: '證券名稱',
                      accessor: '證券名稱',
                      Cell: props => <span>{props.value}</span>,
                      filterMethod: (filter, row) => {
                        console.log(row, filter)
                        return row.證券名稱.toLowerCase().indexOf(filter.value.toLowerCase()) !== -1;
                      },
                      minWidth: 30
                    }]
                  },
                  {
                    Header: '漲跌',
                    columns: [{
                      id: '漲跌(+/-)',
                      Header: props => <span style={{ color: '#bf3d31' }}>漲跌(+/-)</span>,
                      accessor: '漲跌(+/-)',
                      Cell: props => <span>{props.value}</span>,
                      filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                          return true;
                        }
                        return row[filter.id] === filter.value;
                      },
                      Filter: ({ filter, onChange }) =>
                        <select
                          onChange={event => onChange(event.target.value)}
                          style={{ width: "100%" }}
                          value={filter ? filter.value : "all"}
                        >
                          <option value="all">顯示全部</option>
                          <option value="+">+</option>
                          <option value="-">-</option>
                        </select>,
                      minWidth: 30
                    }, {
                      id: '漲跌價差',
                      Header: props => <span style={{ color: '#3b5998' }}>漲跌價差</span>,
                      accessor: '漲跌價差',
                      filterable: false,
                      Cell: props => <span>{props.value}</span>,
                      minWidth: 30
                    }]
                  },
                  {
                    Header: '成交',
                    columns: [{
                      id: '成交股數',
                      Header: props => <span style={{ color: '#bf3d31' }}>成交股數</span>,
                      accessor: '成交股數',
                      Cell: props => <span>{props.value}</span>,
                      filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                          return true;
                        }
                        return row[filter.id] === filter.value;
                      },
                      Filter: ({ filter, onChange }) =>
                        <select
                          onChange={event => onChange(event.target.value)}
                          style={{ width: "100%" }}
                          value={filter ? filter.value : "all"}
                        >
                          <option value="all">顯示全部</option>
                          <option value="+">+</option>
                          <option value="-">-</option>
                        </select>,
                      minWidth: 30
                    }, {
                      id: '成交金額',
                      Header: props => <span style={{ color: '#3b5998' }}>成交金額</span>,
                      accessor: '成交金額',
                      filterable: false,
                      Cell: props => <span>{props.value}</span>,
                      minWidth: 30
                    }]
                  },
                  {
                    Header: '金額',
                    columns: [{
                      id: '開盤價',
                      Header: props => <span style={{ color: '#bf3d31' }}>開盤價</span>,
                      accessor: '開盤價',
                      filterable: false,
                      Cell: props => <span>{props.value}</span>,
                      minWidth: 30
                    }, {
                      id: '收盤價',
                      Header: props => <span style={{ color: '#3b5998' }}>收盤價</span>,
                      accessor: '收盤價',
                      filterable: false,
                      Cell: props => <span>{props.value}</span>,
                      minWidth: 30
                    }, 
                    {
                      id: 'flurry',
                      Header: props => <span style={{ color: '#82ca9d' }}>最高價</span>,
                      accessor: '最高價',
                      filterable: false,
                      Cell: props => <span>{props.value}</span>,
                      minWidth: 30
                    },
                    {
                      id: 'low',
                      Header: props => <span style={{ color: '#82ca9d' }}>最低價</span>,
                      accessor: '最低價',
                      filterable: false,
                      Cell: props => <span>{props.value}</span>,
                      minWidth: 30
                    }]
                  },
                  {
                    Header: '本益比',
                    columns: [{
                      id: '本益比',
                      Header: '本益比',
                      accessor: '本益比',
                      Cell: props => <span>{props.value}</span>,
                      filterMethod: (filter, row) => {
                        return row[filter.id].country.toLowerCase().indexOf(filter.value.toLowerCase()) !== -1;
                      },
                      minWidth: 30
                    }]
                  },
                ]}
                className="-striped -highlight"
                pageSize={[...StockData].length}
                defaultPageSize={30}
                // sortable={false}
                filterable={true}
                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: (e, handleOriginal) => {
                      if (column.Header === '' || selected === rowInfo.index) {
                        return;
                      }
                      getData({code: rowInfo.original.證券代號}).then(data => {
                        this.setState({ data: data })
                      })
                    }
                  }
                }}
                getTrProps={(state, rowInfo, column) => {
                  return {
                    style: {
                      textDecoration: rowInfo && this.state.done.indexOf(rowInfo.index) !== -1 ? 'line-through' : 'none',
                      color: rowInfo && rowInfo.index === selected ? '#4285f4' : '#000',
                    }
                  }
                }}
              />
            </div>
          )
        }
        
      </div>
    );
  }
}
export default StockList2;