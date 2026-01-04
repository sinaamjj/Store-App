import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";

import { shortenText } from "../helper/helper";

import { TbListDetails } from "react-icons/tb";
import { TbShoppingBagCheck } from "react-icons/tb";

function Card({ data }) {
  const { id, title, image, price } = data;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/products/${id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleNavigate();
    }
  };

  return (
    <div
      className={styles.card}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <img src={image} alt={title} />
      <h3>{shortenText(title)}</h3>
      <p>{price} $</p>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.detailsButton}
          onClick={(event) => {
            event.stopPropagation();
            handleNavigate();
          }}
        >
          <TbListDetails />
        </button>
        <div>
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
          >
            <TbShoppingBagCheck />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
