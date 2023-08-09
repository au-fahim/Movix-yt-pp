import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

export default function Recommendation({ mediaType, id }) {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

  const title = mediaType === "tv" ? "Recommended TV Shows" : "Recommended Movies"

  return (
    <>
      {data?.results?.length > 0 && (
        <Carousel
          title={title}
          data={data?.results}
          loading={loading}
          endpoint={mediaType}
        />
      )}
    </>
  );
}