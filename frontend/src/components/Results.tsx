import type { Carrier } from "./CityForm";

const Results = ({ carriers }: { carriers: Carrier[] }) => (
  <ul>
    {carriers.map((carrier, index) => (
      <li key={index}>
        {carrier.name} ({carrier.trucks_per_day} trucks/day)
      </li>
    ))}
  </ul>
);

export default Results;
