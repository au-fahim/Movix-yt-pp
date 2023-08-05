import "./style.scss"
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";

export default function Home() {
  return (
    <section>
      <HeroBanner />
      <Trending />
    </section>
  );
}
