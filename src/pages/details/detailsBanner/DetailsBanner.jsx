import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss"

import { PlayBtn } from "../PlayBtn";
import PosterFallback from '/no-poster.png';
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadingImage/Img";
import Genres from "../../../components/genres/Genres";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import CircleRating from "../../../components/circleRating/CircleRating";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";



export default function DetailsBanner({ video, crew }) {
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState(null)

  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}`)

  const { url } = useSelector((state) => state.home)

  const _genres = data?.genres?.map((q) => q.id)

  const director = crew?.filter((person) => person.job === "Director");
  const writer = crew?.filter(
    (person) =>
      person.job === "Writer" ||
      person.job === "Story" ||
      person.job === "Screenplay"
  );
  

  const toHoursAndMinutes = (totalMin) => {
    let hour = Math.floor(totalMin / 60),
      minute = totalMin % 60;
    
    return `${hour}h ${minute}m`
  }

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>

              <div className="opacity-layer"></div>

              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.poster + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (
                          ${dayjs(data.release_date).format("YYYY")}
                        )`}
                    </div>

                    <div className="subtitle">{data.tagline}</div>

                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />

                      {video ? (
                        <div
                          className="playbtn"
                          onClick={() => {
                            setShow(true);
                            setVideoId(video.key);
                          }}
                        >
                          <PlayBtn />
                          <span className="text">Watch Trailer</span>
                        </div>
                      ) : (
                        <div className="playbtn">
                          <PlayBtn />
                          <span className="text">No Trailer Available</span>
                        </div>
                      )}
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}

                      {data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}

                      {data?.first_air_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}

                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Duration: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* DIRECTOR INFO ROW */}
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Directors: </span>

                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writers: </span>

                        <span className="text">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creators: </span>

                        <span className="text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
}