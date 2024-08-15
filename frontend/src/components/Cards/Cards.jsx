import React, { memo } from "react";
import "./Cards.css";

const Cards = memo(({ cardTitle, data, extras, icon }) => {
  return (
    <>
      <div className="card_container">
        <div className="card_info">
          {cardTitle && (
            <div>
              <p>{cardTitle}</p>
            </div>
          )}
          {data && (
            <div>
              <span>{data}</span>
            </div>
          )}
          {extras && <p>{extras}</p>}
        </div>
        <div className="card_icon">{icon}</div>
      </div>
    </>
  );
});

export default Cards;
