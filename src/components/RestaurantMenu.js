import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showCategoryItems, setShowCategoryItems] = useState(null);

  if (resInfo === null) {
    return <Shimmer />;
  }

  const {
    name,
    cuisines,
    costForTwoMessage,
    areaName,
    city,
    isOpen,
    totalRatingsString,
  } = resInfo?.cards[0]?.card?.card?.info;

  console.log(
    name,
    cuisines,
    costForTwoMessage,
    areaName,
    city,
    isOpen,
    totalRatingsString
  );

  const categories =
    resInfo?.cards[2].groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="mx-20 p-20">
      <div className="flex justify-between border-b-2">
        <div>
          <h1 className="text-3xl font-semibold">{name}</h1>
          <h3 className="italic text-xs text-gray-700">
            {cuisines.join(", ")}
          </h3>
          <p className="text-xs text-gray-700">
            {areaName}, {city}
          </p>
        </div>
        <div className="border p-1 rounded-md flex flex-col justify-around items-center">
          <p className="text-xs text-gray-500 border-b-2 py-2">
            {totalRatingsString}
          </p>
          <p>
            {isOpen ? (
              <span className="text-xs text-green-700">Open</span>
            ) : (
              <span className="text-xs text-red-700">Closed</span>
            )}
          </p>
        </div>
      </div>

      {categories.map((category) => (
        <RestaurantCategory
          key={category.card?.card?.title}
          category={category}
          setShowCategoryItems={setShowCategoryItems}
          showCategoryItems={showCategoryItems}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
