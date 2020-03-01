import React from 'react';
import './TodoApp.css'

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',
      backup: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.toggle = this.toggle.bind(this);
    this.showPending = this.showPending.bind(this);
    this.showCompleted = this.showCompleted.bind(this);
    this.showAll = this.showAll.bind(this);
    this.clear = this.clear.bind(this);
  }


  render() {
    return (
      <div>
        <h3>To Do List</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button onClick={this.add} >Add</button>
          <button onClick={this.remove} >Remove</button>
          <button onClick={this.toggle} >Toggle</button>
          <button onClick={this.showPending} >Pending</button>
          <button onClick={this.showCompleted} >Completed</button>
          <button onClick={this.showAll} >All</button>
          <button onClick={this.clear} >Clear</button>
        </form>

        <TodoList items={this.state.items} />
      </div>
    );
  }


  add() {

    if (!this.state.text.length) {
      return;
    }

    let backup = [...this.state.backup];
    this.setState({
      items: backup,
    });

    const newItem = {
      content: this.state.text,
      id: Date.now(),
      flag: 'pending',
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      backup: state.backup.concat(newItem),
      text: '',
    }));
    // console.log(this.state.items)
  }

  remove() {

    if (!this.state.text.length) {
      return;
    }

    let backup = [...this.state.backup];
    this.setState({
      items: backup,
    });

    this.state.items.map((item, index) => {
      if ((index + 1) == this.state.text) {

        let itemInBack = item.content;
        let items = [...this.state.items];            //如果不这样创建新数组，则不会更新，也不会删除成功，原因是数组的赋值是引用传递的，items = this.state.items 是执行 items 这个数组的内存，所以执行data.splice()实际上相当于执行了 this.state.items.splice()，所以react的 虚拟dom 发现 state 里面的 items 没有变化，所以不更新视图
        items.splice(index, 1)

        let backup = [...this.state.backup];
        this.state.backup.map((item, index) => {
          if (item.content === itemInBack)
            backup.splice(index, 1)
        })

        this.setState({
          items: items,
          backup: backup,
        });
      }
      this.setState({
        text: ''
      });
    })
    // console.log(this.state.items)
  }

  toggle() {

    if (!this.state.text.length) {
      return;
    }

    let backup = [...this.state.backup];
    this.setState({
      items: backup,
    });

    this.state.items.map((item, index) => {
      if ((index + 1) == this.state.text){

        let items = [...this.state.items];
        if(items[index].flag === 'pending')
          items[index].flag = 'completed';
        else items[index].flag = 'pending';

        this.setState({
          items: items,
          backup: backup,
        });
      } 
      this.setState({
        text: ''
      });
    })
  }


  showAll() {

    let backup = [...this.state.backup];
    this.setState({
      items: backup,
    });
    
  }

  showPending() {

    let backup = [...this.state.backup];
    this.setState({
      items: backup,
    });
    
    let items = [];
    backup.map((item) => {
      if (item.flag === 'pending')
        items.push(item)
    })
    
    this.setState({
      items: items,
    });
  }

  showCompleted() {

    let backup = [...this.state.backup];
    this.setState({
      items: backup,
    });
    
    let items = [];
    backup.map((item) => {
      if (item.flag === 'completed')
        items.push(item)
    })

    this.setState({
      items: items,
    });

  }

  clear() {
    let items = [];
    this.setState({
      items: items,
      text: '',
      backup: items,
    });
  }


  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }


  handleSubmit(e) {
    e.preventDefault();
  }
}


class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, index) => (
          <li key={item.id}>{index + 1}. {item.flag} -> {item.content}</li>
        ))}
      </ul>
    );
  }
}


export default TodoApp;