/**
 * Created By brand On 2018/2/2
 */
import React, {Component} from 'react'
import Pagecomponent from '../components/pagecomponent'
import data from '../file.json'

const JsonTable = require('ts-react-json-table');

class Pagecontainer extends Component {
    constructor() {
        super()
        this.state = {
			number: 1,
            dataList:[],
            pageConfig: {
                totalPage: Math.round(data.length / 100)
            }
        }
        this.getCurrentPage = this.getCurrentPage.bind(this)
    }
    getCurrentPage(currentPage) {
        this.setState({
			// dataList:data[currentPage-1].證券代號,
			number: currentPage
		})
    }
    render() {
        let lists = [];
        for(let i=100 * (this.state.number - 1);i<100 * (this.state.number);i++){
			try{
				var obj = data[i]
				console.log(obj)
				lists.push(obj)
			}
			catch(e){
				console.log('error', e);        
			}
		}
        return (
            <div>
				<JsonTable rows = {lists} />
                <Pagecomponent pageConfig={this.state.pageConfig}
                               pageCallbackFn={this.getCurrentPage}/>
            </div>
        )
    }
}
export default Pagecontainer