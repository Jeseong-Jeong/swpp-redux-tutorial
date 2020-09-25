import React, {Component} from 'react';

import Todo from '../../components/Todo/Todo';

import { NavLink } from 'react-router-dom';

import "./TodoList.css"

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/index';

import { withRouter } from 'react-router';
import Axios from 'axios';

class TodoList extends Component {
    componentDidMount() {
        this.props.onGetAll();
    }

    clickTodoHandler = (td) => {
        this.props.history.push('/todos/' + td.id);  
    }
    
    render() {
        const todos = this.props.storedTodos.map((td) => {
            return ( 
                <Todo 
                    key={td.id} 
                    title={td.title}
                    done={td.done} 
                    clickDetail={() => this.clickTodoHandler(td)}
                    clickDone={() => this.props.onToggleTodo(td.id)}
                    clickDelete={() => this.props.onDeleteTodo(td.id)} />
            );
        });

        let todo = null;
        return (
            <div className='TodoList'>
                <div className='title'>{this.props.title}</div>
                <div className='todos'>{todos}</div>
                {todo}
                <NavLink to='new-todo' exact>New Todo</NavLink>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedTodos: state.td.todos,
        selectedTodo: state.td.selectedTodo,
    };
}

const mapDispatchToProps = dispatch => {
    return {
      onToggleTodo: (id) => dispatch(actionCreators.toggleTodo(id)),
      onDeleteTodo: (id) => dispatch(actionCreators.deleteTodo(id)),
      onGetAll: () => dispatch(actionCreators.getTodos()),    
      onGetTodo: (id) => dispatch(actionCreators.getTodo(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));
