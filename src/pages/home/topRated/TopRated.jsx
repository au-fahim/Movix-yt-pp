import { useState } from "react"

import "../style.scss"

import useFetch from "../../../hooks/useFetch"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import Carousel from "../../../components/carousel/Carousel";



export default function TopRated() {
  const [endpoint, setEndpoint] = useState("tv")

  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "On TV" ? "tv" : "movie")
  }

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Latest Trailers</span>

        <SwitchTab data={["On TV", "In Theaters"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
}