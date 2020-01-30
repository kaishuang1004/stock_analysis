import React from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { ChartCanvas, Chart } from "react-stockcharts";
import {
	CandlestickSeries,
	LineSeries,
	BollingerSeries,
	BarSeries,
	AreaSeries,
	MACDSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip, MovingAverageTooltip, BollingerBandTooltip, MACDTooltip } from "react-stockcharts/lib/tooltip";
import { ema, sma, bollingerBand, macd } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
const bbStroke = {
	top: "#964B00",
	middle: "#000000",
	bottom: "#964B00",
};
const bbFill = "#4682B4";
const macdAppearance = {
	stroke: {
		macd: "#FF0000",
		signal: "#00F300",
	},
	fill: {
		divergence: "#4682B4"
	},
};
const mouseEdgeAppearance = {
	textFill: "#542605",
	stroke: "#05233B",
	strokeOpacity: 1,
	strokeWidth: 3,
	arrowWidth: 5,
	fill: "#BCDEFA",
};
class CandleStickChartWithBollingerBandOverlay extends React.Component {
	render() {
		const ema26 = ema()
			.id(0)
			.options({ windowSize: 26 })
			.merge((d, c) => { d.ema26 = c; })
			.accessor(d => d.ema26);

		const ema12 = ema()
			.id(1)
			.options({ windowSize: 12 })
			.merge((d, c) => {d.ema12 = c;})
			.accessor(d => d.ema12);

		const ema20 = ema()
			.options({
				windowSize: 20, // optional will default to 10
				sourcePath: "close", // optional will default to close as the source
			})
			.skipUndefined(true) // defaults to true
			.merge((d, c) => {d.ema20 = c;}) // Required, if not provided, log a error
			.accessor(d => d.ema20) // Required, if not provided, log an error during calculation
			.stroke("blue"); // Optional

		const sma20 = sma()
			.options({ windowSize: 20 })
			.merge((d, c) => {d.sma20 = c;})
			.accessor(d => d.sma20);

		const ema50 = ema()
			.options({ windowSize: 50 })
			.merge((d, c) => {d.ema50 = c;})
			.accessor(d => d.ema50);

		const smaVolume50 = sma()
			.options({ windowSize: 20, sourcePath: "volume" })
			.merge((d, c) => {d.smaVolume50 = c;})
			.accessor(d => d.smaVolume50)
			.stroke("#4682B4")
			.fill("#4682B4");

		const macdCalculator = macd()
			.options({
				fast: 12,
				slow: 26,
				signal: 9,
			})
			.merge((d, c) => {d.macd = c;})
			.accessor(d => d.macd);

		const bb = bollingerBand()
			.merge((d, c) => {d.bb = c;})
			.accessor(d => d.bb);

		const { type, data: initialData, width, ratio } = this.props;

		const bollingData = ema20(sma20(ema50(smaVolume50(bb(initialData)))));
		const calculatedData = smaVolume50(macdCalculator(ema12(ema26(bollingData))));
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);


		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas height={600}
				width={width}
				ratio={ratio}
				margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				<Chart id={1} height = {300}
					yExtents={[d => [d.high, d.low], sma20.accessor(), ema20.accessor(), ema50.accessor(), bb.accessor()]}
					padding={{ top: 10, bottom: 20 }}
					onContextMenu={(...rest) => { console.log("chart - context menu", rest); }}
				>
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="right" orient="right" ticks={5}
						onDoubleClick={(...rest) => { console.log("yAxis - double click", rest); }}
						onContextMenu={(...rest) => { console.log("yAxis - context menu", rest); }}
					/>

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<CandlestickSeries />
					<BollingerSeries yAccessor={d => d.bb}
						stroke={bbStroke}
						fill={bbFill} />

					<LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()}/>
					<LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
					<LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>
					<CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()} />
					<CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
					<CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />

					<OHLCTooltip origin={[-40, 0]}/>

					<MovingAverageTooltip
						onClick={e => console.log(e)}
						origin={[-38, 15]}
						options={[
							{
								yAccessor: sma20.accessor(),
								type: sma20.type(),
								stroke: sma20.stroke(),
								windowSize: sma20.options().windowSize,
							},
							{
								yAccessor: ema20.accessor(),
								type: ema20.type(),
								stroke: ema20.stroke(),
								windowSize: ema20.options().windowSize,
							},
							{
								yAccessor: ema50.accessor(),
								type: ema50.type(),
								stroke: ema50.stroke(),
								windowSize: ema50.options().windowSize,
							},
						]}
					/>
					<BollingerBandTooltip
						origin={[-38, 60]}
						yAccessor={d => d.bb}
						options={bb.options()} />
				</Chart>
				<Chart id={2} 
					yExtents={[d => d.volume, smaVolume50.accessor()]}
					height={150} origin={(w, h) => [0, h - 300]}
				>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")} />

					<BarSeries yAccessor={d => d.volume} fill={d => d.close < d.open ? "#6BA583" : "#FF0000" } />
					<AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>
					<CurrentCoordinate yAccessor={smaVolume50.accessor()} fill={smaVolume50.stroke()} />
					<CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />
				</Chart>
				<Chart id={3} height={150}
					yExtents={macdCalculator.accessor()}
					origin={(w, h) => [0, h - 150]} padding={{ top: 10, bottom: 10 }}
				>
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="right" orient="right" ticks={2} />

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")}
						rectRadius={5}
						{...mouseEdgeAppearance}
					/>
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")}
						{...mouseEdgeAppearance}
					/>
					<MACDSeries yAccessor={d => d.macd}
						{...macdAppearance} />
					<MACDTooltip
						origin={[-38, 15]}
						yAccessor={d => d.macd}
						options={macdCalculator.options()}
						appearance={macdAppearance}
					/>
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

CandleStickChartWithBollingerBandOverlay.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithBollingerBandOverlay.defaultProps = {
	type: "svg",
};
CandleStickChartWithBollingerBandOverlay = fitWidth(CandleStickChartWithBollingerBandOverlay);

export default CandleStickChartWithBollingerBandOverlay;
