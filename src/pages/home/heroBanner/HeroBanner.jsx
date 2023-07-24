import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./style.scss"

export default function HeroBanner() {
  return (
    <div className="heroBanner">
      {/* {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )} */}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          {/* <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div> */}
        </div>
      </ContentWrapper>
    </div>
  );
}