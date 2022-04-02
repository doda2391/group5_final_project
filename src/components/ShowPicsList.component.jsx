import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState } from "react";
import ShoeCard from "./ShoeCard.component";

const ShowPicsList = (props) => {
  if (props.error == false) {
    let total = 0;
    for (let i = 0; i < props.Information.length; i++) {
      if (typeof props.Information[i].price === "string") {
        if (props.Information[i].price.charAt(0) === "$") {
          props.Information[i].price = parseInt(
            props.Information[i].price.substring(1)
          );
        } else {
          props.Information[i].price = parseInt(props.Information[i].price);
        }
      }
      total += props.Information[i].price;
    }
    const average = total / props.Information.length;

    if (props.LTH === true) {
      props.Information.sort(function (a, b) {
        return a.price - b.price;
      });
    } else {
      props.Information.sort(function (a, b) {
        return b.price - a.price;
      });
    }

    return (
      <ImageList sx={{ width: 1200, height: 1450 }} cols={3}>
        {props.Information &&
          props.Information.map((item) => (
            <ImageListItem key={item.id}>
              <ShoeCard
                name={item.name}
                image={item.image}
                description={item.description}
                price={item.price}
                average={average}
              />
            </ImageListItem>
          ))}
      </ImageList>
    );
  } else {
    return <div></div>;
  }
};

export default ShowPicsList;
