import React, { Component } from "react";
import { TypeChooser } from "react-stockcharts/lib/helper";
import { getData } from "../utils"
import Chart from '../Chart';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
class StockList extends Component {
  constructor() {
    super();
    this.state = {
      code: 1101,
      tablePageSize: 6,
      Stockdata: [], 
      data:null,
      chartData: [],
      selected: -1,
      done: []
    };
  }
  toggleLine(key) {
    const { money } = this.state
    money[key] = !money[key];
    this.setState({
      money: money
    })
  }
  componentDidMount() {
    getData({code: this.state.code}).then(data => {
			this.setState({ data: data })
    })
    this.fetchAlertData();
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
          Stockdata: data
        });
      });
  }
  render() {
    const { Stockdata, data, tablePageSize, selected } = this.state;
    if (this.state.data == null) {
			return <div>Loading...</div>
    }
    return (
      <div>
        <TypeChooser>
           {type => <Chart type={type} data={data} />}
        </TypeChooser>  
        <ReactTable
          data={Stockdata}
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
          pageSize={tablePageSize}
          showPageSizeOptions={false}
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
    );
  }
}
export default StockList;