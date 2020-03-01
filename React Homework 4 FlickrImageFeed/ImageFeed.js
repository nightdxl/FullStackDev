import React, { Component } from 'react';
import axios from 'axios';

import './ImageFeed.css';

const API_KEY = '13ec6d7463d69f6466906308a0ca75ec';

class ImageFeed extends Component {
    
    // lifecycle 1
    constructor(props) {
        super(props)

        this.state = {
            Tag: '',
            API_URL: '',
            data: {},
            picUrl: [],
            randomTen: [],
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchPics = this.fetchPics.bind(this)
        this.getRandomTen = this.getRandomTen.bind(this)

    }

    // lifecycle 3
    componentDidMount() {

    }


    fetchPics() {
        // const axios = require('axios');
        // Make a request for a user with a given ID
        axios.get(this.state.API_URL)
            .then((response) => {
                // handle success

                const data = response.data.photos.photo;
                this.setState({
                    data: data
                })

                // console.log(this.state.data);

                var url = [];
                for (var i = 0; i < data.length; i++) {
                    url.push(`https://farm${data[i].farm}.staticflickr.com/${data[i].server}/${data[i].id}_${data[i].secret}.jpg`);
                }

                this.setState({
                    picUrl: url
                })
                // console.log(this.state.picUrl);

            })
            .catch((error)=> {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
                this.getRandomTen(this.state.picUrl.length);
            });

    }

    getRandomTen(max) {
        var randomNum = [];

        console.log("This time the random 10 are:")

        for (let i = 0; i < 10; i++) {
            let x = Math.round(Math.random()*max)
            randomNum[i] = this.state.picUrl[x]

            console.log(`${x}`)
        }

        this.setState({
            randomTen: randomNum
        })

    }
        

    ShowPic(props) {
        return (
            <div className="Pics">
                <img src={props} alt="" height="100%"/>
            </div>);
    }

    handleChange(e) {
        // console.log(e.target.value);

        // set state Tag to currentValue

        this.setState({
            // [..] 就可以不用写 username 和 password 两遍了
            Tag: e.target.value,
            API_URL: `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${e.target.value}&format=json&nojsoncallback=1`
        })
        
        // console.log('Change');
        // console.log(this.state);
    }

    handleSubmit(e) {
        e.preventDefault(); 
        // this.setState({

        // })
        
        // console.log('Submit');
        // console.log(this.state);

        this.fetchPics();
        
    }

    // lifecycle 2
    render() {
        return (
            <div className="Container">
                <h1>Flickr Image Feed</h1>
                    <div className="SearchBar">
                    <label htmlFor="Search">Get Pics of: </label>
                    <input type="text"
                        name="Tag"
                        id="Tag"
                        value={this.state.Tag}
                        onChange={this.handleChange}
                    />
                    <button type="text"
                        name="API_URL"
                        id="API_URL"
                        value={`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${this.state.Tag}&format=json&nojsoncallback=1`}
                        onClick={this.handleSubmit.bind(this)}
                    >Search</button>
                </div>
                                                                               
                    {/* <ShowPic img={this.state.randomTen[0]} /> */}
                    {/* <ShowPic img={this.state.randomTen[1]} /> */}
                    {/* 用 map 实现循环输出 */}

                <div>
                    {this.state.randomTen.map(
                        (item) => {
                            return this.ShowPic(item)
                        }                        )}
                </div>
            </div>
        )
    }
}





export default ImageFeed;
