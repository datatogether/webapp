import React, { PropTypes } from 'react';

const TabBar = ({ tabs, value, onChange }) => {
  const handleClick = (tab) => {
    return () => {
      onChange(tab);
    };
  };

  return (
    <div className="tab bar row">
      <div className="col-md-12">
        <hr className="green" />
        {tabs.map((tab, i) => {
          return (
            <a
              className={(value == tab) ? "current tab" : "tab"}
              onClick={handleClick(tab)}
              key={i}
            >{tab}</a>
          );
        })}
        <hr className="green" />
      </div>
    </div>
  );
};

TabBar.propTypes = {
  tabs: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TabBar;
