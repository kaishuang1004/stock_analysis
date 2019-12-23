import React from 'react';

class PlotlyChart extends React.Component {
  constructor() {
    super();
    this.state = {
      randomId: `${btoa(new Date().getTime())}${Math.random()}`
    }
  }

  componentDidMount() {
    const { title, data } = this.props;
    const {onLoadComplete, onLoading} = this.props;
    const { randomId } = this.state;
    if (data) {
      window.PLOTLYENV = window.PLOTLYENV || {};
      window.PLOTLYENV.BASE_URL = 'https://plot.ly';
      window.Plotly.newPlot(randomId, data.fig, { "title": (title || '') }, { "showLink": true, "linkText": "Export to plot.ly" });
    } else {
      this.fetchData();
    }
  }

  fetchData() {
    const { url, title } = this.props;
    const { randomId } = this.state;
    let today = new Date();
    let theDayBeforeYesterday = new Date(today.setDate(today.getDate() - 2));

    if (!url) {
      return;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        window.PLOTLYENV = window.PLOTLYENV || {};
        window.PLOTLYENV.BASE_URL = 'https://plot.ly';
        switch (this.props.type) {
          case 'map':
            window.Plotly.newPlot(randomId, data, { "geo": { "showcoastlines": false, "showframe": false, "projection": { "type": "Mercator" } } }, { "showLink": true, "linkText": "Export to plot.ly" });
            break;
          case 'newRegisters':
            window.Plotly.newPlot(randomId, data, { "title": `New register since ${theDayBeforeYesterday.toISOString().slice(0, 10)}`, "barmode": "stack" }, { "showLink": true, "linkText": "Export to plot.ly" });
            break;
          default:
            console.log(data)
            window.Plotly.newPlot(randomId, data, { "title": (title || '') }, { "showLink": true, "linkText": "Export to plot.ly" });
            break;
        }
      })
  }

  componentDidUpdate(prevProps, prevState) {
    const { url, title, data } = this.props;
    const { randomId } = this.state;
    let today = new Date();
    let theDayBeforeYesterday = new Date(today.setDate(today.getDate() - 2));
    if (prevProps.url !== url) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          document.getElementById(`${randomId}`).innerHTML = '';
          window.PLOTLYENV = window.PLOTLYENV || {};
          window.PLOTLYENV.BASE_URL = 'https://plot.ly';
          switch (this.props.type) {
            case 'map':
              window.Plotly.newPlot(randomId, data, { "geo": { "showcoastlines": false, "showframe": false, "projection": { "type": "Mercator" } } }, { "showLink": true, "linkText": "Export to plot.ly" });
              break;
            case 'newRegisters':
              window.Plotly.newPlot(randomId, data, { "title": `New register since ${theDayBeforeYesterday.toISOString().slice(0, 10)}`, "barmode": "stack" }, { "showLink": true, "linkText": "Export to plot.ly" });
              break;
            default:
              window.Plotly.newPlot(randomId, data, { "title": (title || '') }, { "showLink": true, "linkText": "Export to plot.ly" });
              break;
          }
        })
        .catch(e => {
          document.getElementById(`${randomId}`).innerHTML = '';
        })
    }

    if (prevProps.data && data && prevProps.data._id !== data._id) {
      document.getElementById(`${randomId}`).innerHTML = '';
      window.PLOTLYENV = window.PLOTLYENV || {};
      window.PLOTLYENV.BASE_URL = 'https://plot.ly';
      window.Plotly.newPlot(randomId, data.fig, { "title": (title || '') }, { "showLink": true, "linkText": "Export to plot.ly" });
    }
  }

  render() {
    const { width, height } = this.props
    return (
      <div id={this.state.randomId} className="plotly-graph-div" style={{ width: width ? `${width}px` : '80%', height: height ? `${height}px` : '80%' }}></div>
    )
  }
}

export default PlotlyChart;