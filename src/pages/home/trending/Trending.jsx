import { useState } from "react";

import "../style.scss"

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import ContentWrapper from './../../../components/contentWrapper/ContentWrapper';

export default function Trending() {
  const [endpoint, setEndpoint] = useState("day")

  const { data, loading } = useFetch(`/trending/all/${endpoint}`)

  const onTabChange = (tab) => {
    setEndpoint(tab === "Today" ? "day" : "week")
  }

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>

        <SwitchTab data={["Today", "This Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
}