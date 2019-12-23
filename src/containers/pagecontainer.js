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
                totalPage: data.length / 10
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
        //先建立一個空陣列
        let lists = [];
        //用迴圈將代辦事項的內容一個個放進空陣列中
        for(let i=10 * (this.state.number - 1);i<10 * (this.state.number);i++){
			//記得在JSX中使用JS變數要用花括號包著
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