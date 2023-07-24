import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__title">Портфолио</h3>
        <nav className="portfolio__list">
          <a
            href="https://github.com/batmanLittle/how-to-learn"
            className="portfolio__link portfolio__link-border"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <p className="portfolio__image">↗</p>
          </a>
          <a
            href="https://batmanlittle.github.io/russian-travel/"
            className="portfolio__link portfolio__link-border"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <p className="portfolio__image">↗</p>
          </a>
          <a
            href="https://github.com/batmanLittle/react-mesto-api-full-gha"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <p className="portfolio__image">↗</p>
          </a>
        </nav>
      </div>
    </section>
  );
}

export default Portfolio;
