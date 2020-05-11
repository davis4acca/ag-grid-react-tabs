import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../reducers/gridActions";
import { Fragment } from "react";

class GridTab extends Component {
  constructor(props) {
    super(props);

    this.inputElRef = React.createRef();

    this.state = {
      editing: false,
      gridName: props.gridName !== undefined ? props.gridName : "New Tab",
    };
  }

  onNameChange(e) {
    this.setState({
      ...this.state,
      gridName: e.target.value,
    });
  }

  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ ...this.state, editing: true });

    setTimeout(() => {
      this.inputElRef.current.focus();
      this.inputElRef.current.select();
    }, 50);
  }

  onBlur() {
    this.setState({ ...this.state, editing: false });

    this.props.actions.changeTabName(
      this.props.viewId,
      this.props.gridId,
      this.state.gridName
    );
  }

  handleEnter(e) {
    let isEnterPressed = e.key === "Enter";
    if (isEnterPressed) {
      this.setState({ ...this.state, editing: false });

      this.props.actions.changeTabName(
        this.props.viewId,
        this.props.gridId,
        this.state.gridName
      );
    }
  }

  render() {
    let tabName = this.props.gridName ? this.props.gridName : "New Tab";
    let inPutVisibility = this.state.editing ? "inline-block" : "none";
    let spanVisibility = this.state.editing ? "none" : "inline-block";

    return (
      <Fragment>
        <div onDoubleClick={this.handleClick.bind(this)}>
          <input
            onKeyPress={this.handleEnter.bind(this)}
            style={{ display: inPutVisibility }}
            value={this.state.gridName}
            onChange={this.onNameChange.bind(this)}
            onBlur={this.onBlur.bind(this)}
            ref={this.inputElRef}
          ></input>

          <span style={{ display: spanVisibility }}>{tabName}</span>

          <button
            className={"tab-btn"}
            onClick={(e) => {
              e.stopPropagation();
              this.props.actions.destroyTab(this.props.index);
            }}
          >
            X
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridTab);
