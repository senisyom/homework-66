import { useState } from "react";
import Total from "../../components/Total/Total";
import MealItem from "../../components/MealItem/MealItem";

const Home = () => {
  const [totalCalories, setTotalCalories] = useState<number>(0);

  const handleTotalCalories = (caloriesNumber: number) => {
    setTotalCalories(caloriesNumber);
  };

  return (
    <div>
      <Total totalCalories={totalCalories} />
      <MealItem onTotalCalories={handleTotalCalories} />
    </div>
  );
};

export default Home;
