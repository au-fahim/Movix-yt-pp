import { useState } from "react"

import "../style.scss"

import useFetch from "../../../hooks/useFetch"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Carousel from "../../../components/carousel/Carousel";
import SwitchTab from './../../../components/switchTab/SwitchTab';

export default function Popular() {
  const [endpoint, setEndpoint] = useState("tv")
  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "On TV" ? "tv" : "movie")
  }

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>

        <SwitchTab data={["On TV", "In Theaters"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
}