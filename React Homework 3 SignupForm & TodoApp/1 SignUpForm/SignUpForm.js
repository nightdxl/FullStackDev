import React, { Component } from 'react';

class SignUpForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username:'',
            password:''
        };

       this.handleChange = this.handleChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
    //    this.handleChangePwd = this.handleChangePwd.bind(this)
    }

    handleChange(e) {
        // console.log(e.target.value);
        // set state username to currentValue

        this.setState({
            // [..] 就可以不用写 username 和 password 两遍了
            [e.target.name]: e.target.value
        })
    }


    // handleChangePwd(e) {
    //     console.log(e.target.value);
    //     // set state password to currentValue

    //     this.setState({
    //         password: e.target.value
    //     })
    // }


    handleSubmit(e) {
        e.preventDefault(); 
        if (!this.state.username.length && !this.state.password.length) {
            return;
          }

          this.setState({
                username: '',
                password: '',
          })

        console.log(this.state)
    }


    render() {
        return (
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input  type="text"
                            name="username"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleChange}

                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input  type="password"
                            name="password" 
                            id="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                    />
                </div>
                <button type="submit"
                        onClick={this.handleSubmit}
                >Submit</button>

            </form>
        )
    }
}

export default SignUpForm;