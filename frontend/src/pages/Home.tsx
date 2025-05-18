import { CityForm } from "../components/CityForm";
import "./Pages.css";
type Props = {};

function Home({}: Props) {
  return (
    <div className="home-container">
      <CityForm />
    </div>
  );
}

export default Home;
