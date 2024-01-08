import React from "react";
import { Link } from "react-router-dom";

const DashboardIndex = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/chartarea">Chart Area</Link>
        </li>

        <li>
          <Link to="/chartbar">Chart Bar</Link>
        </li>

        <li>
          <Link to="/chartdonut">Chart Donut</Link>
        </li>

        <li>
          <Link to="/chartpie">Chart Pie</Link>
        </li>

        <li>
          <Link to="/chartline">Chart Line</Link>
        </li>

        <li>
          <Link to="/chartmulti">Chart MultiType</Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardIndex;
