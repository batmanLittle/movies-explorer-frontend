import "./NotFound.css";

import { useNavigate } from "react-router-dom";
export default function NotFound() {
  // const navigate = useNavigate();
  // const location = useLocation();

  let navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button className="not-found__link" onClick={goBack}>
        Назад
      </button>
    </section>
  );
}
