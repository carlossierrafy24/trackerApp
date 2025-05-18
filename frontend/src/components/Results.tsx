import React from "react";
import type { Carrier } from "../types/RequestResponse";
import "./Components.css"; // importa los estilos

interface Props {
  carriers: Carrier[];
  total: number;
}

const Results: React.FC<Props> = ({ carriers, total }) => {
  if (carriers.length === 0) return null;

  return (
    <div className="results-container">
      <h3 className="results-header">Carriers Found: {total}</h3>
      <div className="results-content">
        <table className="results-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Trucks/day</th>
            </tr>
          </thead>
          <tbody>
            {carriers.map((carrier) => (
              <tr key={carrier.name}>
                <td className="company-name">{carrier.name}</td>
                <td>{carrier.trucks_per_day}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
