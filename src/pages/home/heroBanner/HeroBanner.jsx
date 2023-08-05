import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss"
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadingImage/Img";


export default function HeroBanner() {
  const [rendomBgUrl, setRendomBgUrl] = useState();
  const [queryText, setQueryText] = useState("")

  const navigate = useNavigate()
  const { data, loading } = useFetch("/movie/popular");

  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    const bg_path =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 21)]?.backdrop_path;

    setRendomBgUrl(bg_path)
  }, [data])

  
  const searchQueryHandler = (e) => {
    if (queryText.length > 0 && e.key === "Enter") {
      navigate(`/search/${queryText}`)
    }
  }

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={rendomBgUrl} />
        </div>
      ) }

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQueryText(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}