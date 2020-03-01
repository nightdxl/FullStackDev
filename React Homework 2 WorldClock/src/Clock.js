import React, { Component } from 'react';
import './Clock.css';
import moment from 'moment-timezone'


// Option 1 functional component
// const Clock = (props) => <h1>{props.time}</h1>

// Option 2 class component


export default class Clock extends Component {
    // lifecycle 1
    constructor(props) {
        super();
        
        if(!props.city)
            this.city = Intl.DateTimeFormat().resolvedOptions().timeZone     // 如果没有指定城市，则默认为当前城市，这个写法是 获取当前系统时区唯一的准确办法（时区位移是不准确的，因为有夏令时、冬令时）
        else
            this.city = props.city;

        var tzList = moment.tz.names();
        this.timeCity = this.city.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());         // timeCity 是显示在时钟上的城市名，这里假设用户输入规范，做为变量临时用一下
        
                // .toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()) 的作用是把获得输入的城市每个单词首字母大写
        
        this.tzCity = this.fuzzyQuery(tzList, this.timeCity.replace(/ /g,"_"))[0];          // tzCity 是列表中对应的输入的城市名，在列表中查找匹配的城市，并规范化 大洲/城市名

                // .replace(/ /g,"_") 的作用是替换城市名中的 空格 为 下划线，因为在 moment timezone 的服务器列表上都是下划线，如果不喜欢 Regular Expression，更好理解的写法是 .split(' ').join('_') 

        if(this.tzCity)
            this.city = this.tzCity;                                    // 如果城市列表中找到了要查询的城市
        else {
            this.city = moment.tz.guess();                              // 如果城市列表中找不到要查询的城市，则设置为猜测的当前系统的时区，并提示用户
            alert("City Not Found, Will Show Current Timezone");
        }

        this.timeCity = this.city.split('/')[this.city.split('/').length - 1].replace(/_/g," ");

                // timeCity 是显示在时钟上的城市名，这些操作都是为了规格化城市名
                // this.city.split('/')[this.city.split('/').length - 1] 作用是把 Asia/Shanghai 的后半部分城市名取出（通过 / 分割，然后取最后一半（本例就是后面一半）），因为有些时区并没有大洲
                // .replace(/_/g," ") 的作用和刚才刚好相反，然后替换城市名中的 下划线 为 空格

        this.date = moment(new Date()).tz(this.city);

        this.state = {
            week: this.date.format("ddd"),
            month: this.date.format("MMM"),
            day: this.date.format("DD"),
            year: this.date.format("YYYY"),
            hour: this.date.format("H"),
            minute: this.date.format("mm"),
            second: this.date.format("ss"),
        }
    }


    fuzzyQuery(list, keyWord) {
        var arr = [];
            for (var i = 0; i < list.length; i++) {
                if (list[i].indexOf(keyWord) >= 0) {
                    arr.push(list[i]);
                }
            }
            return arr;
        }


    // lifecycle 3
    componentDidMount() {
        this.updateTime();

    }


    // last lifecycle
    componentWillUnmount() {
        clearInterval(this.timer);
    }


    // lifecycle 4
    updateTime() {
        this.timer = setInterval( () => {

            this.date = moment(new Date()).tz(this.city);

            this.setState({
                week: this.date.format("ddd"),
                month: this.date.format("MMM"),
                day: this.date.format("DD"),
                year: this.date.format("YYYY"),
                hour: this.date.format("H"),
                minute: this.date.format("mm"),
                second: this.date.format("ss"),
            })
        },1000)
    }


    // lifecycle 2
    render() {
        return  <div className="container__clock">
                            {/* 比之前的 "clockFrame" 更好  */}
                    <h2>{this.timeCity}</h2>
                    <div className="container__header">
                            {/* 比之前的 "clockDark" 更好 */}
                        <h3>{ this.state.week }</h3>
                        <h3>{ this.state.month }</h3>
                        <h3>{ this.state.day }</h3>
                        <h3>{ this.state.year }</h3>
                    </div>

                    <div className="container__main">
                        {/* 比之前的 "clockTime" 更好 */}
                        <h1 className="container__header">{this.state.hour}</h1>        
                        <h1 className="container">:</h1>
                            {/* 用伪类 after (:) */}
                            
                        <h1 className="container__header">{this.state.minute}</h1>
                        <h1 className="container">:</h1>
                        <h1 className="container__header">{this.state.second}</h1>

                    </div>
                </div>

    }
}

