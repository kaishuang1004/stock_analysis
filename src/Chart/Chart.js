import React from 'react';
import { BarChart, ComposedChart, Bar, LineChart, Line, Legend, XAxis, YAxis, ReferenceLine, CartesianGrid, Tooltip } from 'recharts';
import AdsAnalysisTooltip from '../AdsAnalysisTooltip/AdsAnalysisTooltip';

const Chart = ({ ...props }) => {
    let data = [];
    const days = props.timeRange;
    let cloneData = Array.isArray(props.data) ? [...props.data] : [];

    switch (props.type) {
        case 'adsAnalysis':
            data = cloneData.reverse().slice(0, days).map((elem, index) => {
                return {
                    date: elem.Date,
                    開盤價: elem.Open,
                    收盤價: elem.Close,
                    // flurry: elem.network.flurry.eCPM,
                    // admob: elem.network.admob.eCPM,
                    // marketPlace: elem.network.marketplace.eCPM,
                    // revenue: elem.revenue,
                    // impression: elem.impression,
                    // predictLine: elem.predictLine,
                    // facebookFittedValues: elem.network.fan.fittedvalues,
                    // facebookPredictUpp: elem.network.fan.predict_mean_ci_upp,
                    // facebookPredictLow: elem.network.fan.predict_mean_ci_low,
                    // flurryFittedValues: elem.network.flurry.fittedvalues,
                    // flurryPredictUpp: elem.network.flurry.predict_mean_ci_upp,
                    // flurryPredictLow: elem.network.flurry.predict_mean_ci_low,
                    // admobFittedValues: elem.network.admob.fittedvalues,
                    // admobPredictUpp: elem.network.admob.predict_mean_ci_upp,
                    // admobPredictLow: elem.network.admob.predict_mean_ci_low,
                    // marketPlaceFittedValues: elem.network.marketplace.fittedvalues,
                    // marketPlacePredictUpp: elem.network.marketplace.predict_mean_ci_upp,
                    // marketPlacePredictLow: elem.network.marketplace.predict_mean_ci_low
                }
            }).reverse();
            break;
    }

    let width = 1200;
    let height = 500;

    if (props.width) {
        width = props.width;
    };
    if (props.height) {
        height = props.height;
    }
    // console.log(props)
    switch (props.type) {
        case 'adsAnalysis':
            return (
                <LineChart width={width} height={height} data={data}
                    margin={{ top: 10, right: 5, left: 5, bottom: 5 }} syncId={props.syncId || ''}>
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="0" tickFormatter={(e) => { if (e === 0) return ''; return e; }} />
                    <YAxis yAxisId="1" orientation="right" tickFormatter={(e) => { if (e === 0) return ''; return e; }} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Legend onClick={e => { props.toggleLine(e.dataKey); }} />
                    <Tooltip content={<AdsAnalysisTooltip />} />
                    {props.revenue && <Line type="linear" dataKey="revenue" stroke={props.showRevenueLine ? '#00ACC1' : 'rgba(255,255,255,0)'} dot={false} yAxisId="1" strokeDasharray="5 5" />}
                    <Line type="linear" dataKey="開盤價" stroke={props.開盤價 ? '#bf3d31' : 'rgba(255,255,255,0)'} dot={false} yAxisId="0" />
                    {/* {props.predictLine && <Line type="linear" dataKey="admobFittedValues" legendType="none" stroke={props.facebook ? '#bf3d31' : 'rgba(255,255,255,0)'} activeDot={false} dot={false} strokeDasharray="3 5" yAxisId="0" />}
                    {props.predictLine && <Line type="linear" dataKey="admobPredictUpp" legendType="none" stroke={props.facebook ? '#bf3d31' : 'rgba(255,255,255,0)'} activeDot={false} dot={false} strokeDasharray="3 5" yAxisId="0" />}
                    {props.predictLine && <Line type="linear" dataKey="admobPredictLow" legendType="none" stroke={props.facebook ? '#bf3d31' : 'rgba(255,255,255,0)'} activeDot={false} dot={false} strokeDasharray="3 5" yAxisId="0" />} */}
                    <Line type="linear" dataKey="收盤價" stroke={props.收盤價 ? '#3b5998' : 'rgba(255,255,255,0)'} dot={false} yAxisId="0" />
                    {props.predictLine && <Line type="linear" dataKey="facebookFittedValues" legendType="none" stroke={props.收盤價 ? '#3b5998' : 'rgba(255,255,255,0)'} activeDot={false} dot={false} strokeDasharray="3 5" yAxisId="0" />}
                    {props.predictLine && <Line type="linear" dataKey="facebookPredictUpp" legendType="none" stroke={props.收盤價 ? '#3b5998' : 'rgba(255,255,255,0)'} activeDot={false} dot={false} strokeDasharray="3 5" yAxisId="0" />}
                    {props.predictLine && <Line type="linear" dataKey="facebookPredictLow" legendType="none" stroke={props.收盤價 ? '#3b5998' : 'rgba(255,255,255,0)'} activeDot={false} dot={false} strokeDasharray="3 5" yAxisId="0" />}
                    <Line type="linear" dataKey="flurry" stroke={props.flurry ? '#82ca9d' : 'rgba(255,255,255,0)'} dot={false} yAxisId="0" /> }
        {props.predictLine && <Line type="linear" dataKey="flurryFittedValues" legendType="none" stroke={props.flurry ? '#82ca9d' : 'rgba(255,255,255,0)'} activeDot={false} dot={false} strokeDasharray="3 5" yAxisId="0" />}
                    {props.predictLine && <Line type="linear" dataKey="flurryPredictUpp" legendType="none" stroke={props.flurry ? '#82ca9d' : 'rgba(255,255,255,0)'} activeDot={false} dot={false} strokeDasharray="3 5" yAxisId="0" />}
                    {props.predictLine && <Line type="linear" dataKey="flurryPredictLow" legendType="none" stroke={props.flurry ? '#82ca9d' : 'rgba(255,255,255,0)'} activeDot={false} dot={false} strokeDasharray="3 5" yAxisId="0" />}
                    <Line type="linear" dataKey="marketPlace" stroke={props.marketPlace ? '#E8B647' : 'rgba(255,255,255,0)'} dot={false} yAxisId="0" /> }
        {props.predictLine && <Line type="linear" dataKey="marketPlaceFittedValues" legendType="none" stroke={props.marketPlace ? '#E8B647' : 'rgba(255,255,255,0)'} activeDot={false} dot={false} strokeDasharray="3 5" yAxisId="0" />}
                    {props.predictLine && <Line type="linear" dataKey="marketPlacePredictUpp" legendType="none" stroke={props.marketPlace ? '#E8B647' : 'rgba(255,255,255,0)'} activeDot={false} dot={false} strokeDasharray="3 5" yAxisId="0" />}
                    {props.predictLine && <Line type="linear" dataKey="marketPlacePredictLow" legendType="none" stroke={props.marketPlace ? '#E8B647' : 'rgba(255,255,255,0)'} activeDot={false} dot={false} strokeDasharray="3 5" yAxisId="0" />}
                </LineChart>
            );
        default:
            return null;
    }
}
export default Chart;