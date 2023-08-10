import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./style.scss"
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadingImage/Img";
import { PlayBtn } from "../PlayBtn";

export default function VideoSection({ videos, loading }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        {
          videos?.length > 0 && (
            <div className="sectionHeading">Official Videos</div>
          )
        }
        {
          !loading ? (
            <div className="videos">
              {videos?.map((video) => (
                <div
                  key={video.id}
                  className="videoItem"
                  onClick={() => {
                    setShow(true);
                    setVideoId(video.key);
                  }}
                >
                  <div className="videoThumbnail">
                    <Img
                      src={`https://i.ytimg.com/vi/${video.key}/mqdefault.jpg`}
                    />
                    <PlayBtn />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="videoSkeleton">
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
            </div>
          )
        }
      </ContentWrapper>

      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
}