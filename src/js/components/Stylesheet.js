import React from 'react';

import List from './List';
import UserItem from './item/UserItem';

const Stylesheet = () => {
  return (
    <div id="stylesheet" className="page">
      <div className="container">
        <div className="row">
          <header className="blue col-md-12">
            <hr className="blue" />
            <h1>Le Styles</h1>
          </header>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h1>Heading One</h1>
            <h2>Heading Two</h2>
            <h3>Heading Three</h3>
            <h4>Heading Four</h4>
            <h5>Heading Five</h5>
            <h6>Heading Six</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a dui at enim sodales gravida.
            Donec imperdiet sagittis libero, a egestas nisl rhoncus nec. Proin massa elit, commodo a rutrum eget, condimentum ac lectus.
            Phasellus eget pulvinar tellus. Aliquam nec mi malesuada, feugiat augue molestie, viverra mi. Fusce non arcu venenatis, aliquam arcu eget, blandit risus. Ut id dui a turpis tristique luctus. Etiam dui risus, tincidunt eget elit id, lacinia molestie velit. Phasellus eleifend nunc vel vestibulum dapibus. Phasellus auctor et lectus sit amet fermentum. In eget ex ut dolor egestas tempor. Nam semper libero a elementum bibendum.
            Phasellus cursus, felis eu aliquet maximus, neque lorem egestas est, eu varius nulla sapien vitae tellus.</p>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary">Primary Button</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <header className="col-md-12">
            <hr className="red" />
            <h2>Palette</h2>
          </header>
        </div>
        <div className="row">
          <div className="col-md-2">
            <div className="swatch bg-green" style={{ width: 100, height: 100 }}></div>
            <label>Green</label>
          </div>
          <div className="col-md-2">
            <div className="swatch bg-blue" style={{ width: 100, height: 100 }}></div>
            <label>Blue</label>
          </div>
          <div className="col-md-2">
            <div className="swatch bg-purple" style={{ width: 100, height: 100 }}></div>
            <label>Purple</label>
          </div>
          <div className="col-md-2">
            <div className="swatch bg-red" style={{ width: 100, height: 100 }}></div>
            <label>Red</label>
          </div>
          <div className="col-md-2">
            <div className="swatch bg-yellow" style={{ width: 100, height: 100 }}></div>
            <label>Yellow</label>
          </div>
          <div className="col-md-2">
            <div className="swatch bg-orange" style={{ width: 100, height: 100 }}></div>
            <label>Orange</label>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <header className="col-md-12">
            <hr className="yellow" />
            <h2 className="yellow">Users</h2>
          </header>
          <List data={this.props.users} component={UserItem} />
        </div>
      </div>
    </div>
  );
};

Stylesheet.propTypes = {
};

Stylesheet.defaultProps = {
  users: [
    { id: "4254923e-a3a3-4d6f-ae1d-f6af177215db", created: 1484086940, updated: 1484086940, username: "steve", type: "none", email: "steve@qri.io", name: "Steven", description: "", home_url: "" },
    { id: "9080d2c6-4e2a-4f5c-a49f-97dc1c6e1ecb", created: 1484080475, updated: 1484080475, username: "test_one", type: "none", email: "brendanobrienesq@gmail.com", name: "brendan", description: "", home_url: "" },
  ],
};

export default Stylesheet;
