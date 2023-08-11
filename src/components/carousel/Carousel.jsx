import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import PosterFallback from "/no-poster.png"
import Img from './../lazyLoadingImage/Img';

import "./style.scss"

import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

export default function Carousel({title, data, loading, endpoint }) {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  // CAROUSEL LEFT & RIGHT SCROLL FUNCTION
  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // SKELTON FUNCTION
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {
          !!title && (
            <div className="carouselTitle">{ title }</div>
          )
        }

        <BiChevronLeftCircle
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BiChevronRightCircle
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />

        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;

              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {item?.first_air_date && (
                        dayjs(item.first_air_date).format("MMM D, YYYY")
                      )}
                      {item?.release_date && (
                        dayjs(item.release_date).format("MMM D, YYYY")
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}