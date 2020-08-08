import React, { Component } from 'react';
import {connect} from "react-redux";
import CardList from './component/CardList';
import Search from './component/Search';
import Scroll from './component/Scroll';
import ErrorBoundary from './component/ErrorBoundary';
import './App.css';
import "tachyons";
import {setSearchField, requestRobots} from "./action";
// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending
  }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { robots, searchField, onSearchChange, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <Search searchChange={onSearchChange}/>
        <Scroll>
          { isPending ? <h1>Loading</h1> :
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          }
        </Scroll>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (App);