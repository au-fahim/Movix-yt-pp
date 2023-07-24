import "./style.scss";

export default function PageNotFound() {
  return (
    <section>
      <div className="pageNotFound">
        <ContentWrapper>
          <span className="bigText">404</span>
          <span className="smallText">Page not found!</span>
        </ContentWrapper>
      </div>
    </section>
  );
}
