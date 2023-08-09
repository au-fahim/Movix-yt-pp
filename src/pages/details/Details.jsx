import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

export default function Details() {
  const { mediaType, id } = useParams();
  
  const { data: videos, loading: videosLoading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  // FILTERING OUT OFFICIAL TRAILER FROM RESPONSE
  const officialTrailer = videos?.results?.find(
    (video) => video?.type === "Trailer"
  );

  return (
    <section>
      <DetailsBanner video={officialTrailer} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={!!creditsLoading && creditsLoading} />
      <VideoSection
        videos={videos?.results}
        loading={!!videosLoading && videosLoading}
      />

      {/* RELATED VIDEOS SECTION */}
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </section>
  );
}
