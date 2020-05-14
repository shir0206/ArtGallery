import React, { useState, useEffect, useCallback } from "react";
import "./gallery.css";
import firebase from "../../Firebase/firebase"
import { CardItem } from "../CardItem/CardItem";

export const Gallery = props => {
  // State using for extractig cards data from DB
  const [cardItemsData, setCardItemsData] = useState([]);

  const [clickedCard, setClickedCard] = useState([]);

  const recieveCardDetails = useCallback(
    propsChild => {
      let card = propsChild;
      console.log("recieveCardDetails", card);
      setClickedCard(card);
      props.handleGalleryClickedCard(card);
    },
    [] //[clickedCard]
  );

  useEffect(
    () => {
      // DB Request, extract all the data from Firebase
      firebase
        .database()
        .ref("Cards")
        .once("value", querySnapShot => {
          let data = querySnapShot.val() ? querySnapShot.val() : {};
          let dataJSON = { ...data };

          // Initialize the state with all the data recieved from DB
          setCardItemsData(dataJSON);
        });
    },
    [] // Occurs when the state within is changing (once)
  );

  let cardItemsList = createCardItemsList(
    props.search,
    cardItemsData,
    recieveCardDetails
  );

  return (
    <div id="galleryContainer" className="gallery-container">
      <ul id="gallery" className="gallery">
        {cardItemsList}
      </ul>
      <p id="cardsCounter" className="cards-counter">
        {cardItemsList.length} items found
      </p>
    </div>
  );
};

/**
 * Extract JSON recieved from DB {cardItemsData}
 * init new {CardItem} component for each JSON object, as props
 * @param {State} cardItemsData
 */
function createCardItemsList(search, cardItemsData, recieveCardDetails) {
  let values = Object.values(cardItemsData);
  let list;

  if (search) {
    list = filterCards(values, search);
  } else {
    list = values;
  }

  let cardItemsList = list.map(i => (
    <CardItem
      currentCard={i}
      key={i.id.toString()}
      handleClickedCard={recieveCardDetails}
    />
  ));

  return cardItemsList;
}

/**
 * Filter the cards according to the search text
 */
function filterCards(values, search) {
  let filtered = values.filter(i => {
    // Filter card by the title
    let titleFlag = i.title.toLowerCase().indexOf(search) !== -1;

    // Filter card by the tags, if not filtered by the title
    let tagsFlag = false;
    if (!titleFlag && i.tags) {
      i.tags.filter(tag => {
        if (!tagsFlag) {
          tagsFlag = tag.toLowerCase().indexOf(search) !== -1;
        }
      });
    }

    // Return if the card chosen by the filtering
    return titleFlag || tagsFlag;
  });

  return filtered;
}
