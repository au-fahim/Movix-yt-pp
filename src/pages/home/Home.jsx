import "./style.scss"
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

export default function Home() {
  return (
    <section>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </section>
  );
}
