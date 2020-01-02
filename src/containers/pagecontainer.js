/**
 * Created By Shuang On 2019/12/25
 */
import React, {Component} from 'react'
import Pagecomponent from '../components/pagecomponent'
import data from '../file.json'
import profile from '../profile.json'

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
			number: currentPage
		})
    }
    render() {
        let lists = [];
        for(let i=100 * (this.state.number - 1);i<100 * (this.state.number);i++){
			try{
				var obj = data[i]
				lists.push(obj)
			}
			catch(e){
				console.log('error', e);        
			}
		}
        return (
            <div>
				<JsonTable rows = {lists} />
                <div>
                    更新日期: {profile[0].time}
                </div>
                <Pagecomponent pageConfig={this.state.pageConfig}
                               pageCallbackFn={this.getCurrentPage}/>
            </div>
        )
    }
}
export default Pagecontainer