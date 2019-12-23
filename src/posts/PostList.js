import React, { Component } from 'react';
import post from '../data/post.json';
import search from './SearchComponent';

class PostList extends Component {
    constructor(props){
        super(props);
        this.state = {
            post:post,
            term:''
        }
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event){
        this.setState({term : event.target.value})  //outputs watever the input is inputted
    }

    render() {
        const{term, post} = this.state;  //destructuring
        return(
            <div>
                <form>
                    <input type = "text" onChange = {this.searchHandler} value = {term}/>
                </form>
                <h1>Hello, here is the JSON Data</h1>
                <div>
                               <table border ="1">
                                   <tr>
                                       <th>userId</th>
                                       <th>id</th>
                                       <th>Title</th>
                                       <th>Body</th>
                                   </tr>

                {/* {this.state.post.filter(search(this.state.term)).map((postDetail) =>{ */}
                {post.filter(search(this.state.term)).map((postDetail) =>{
                    return(
                        
                           <tr>
                               <td>{postDetail.userId}</td>
                               <td>{postDetail.id}</td>
                               <td>{postDetail.title}</td>
                               <td>{postDetail.body}</td>
                           </tr>
                              
                            
                    )
                })}
                 </table>
                               </div>
            </div>
        )
    }
}

export default PostList;

