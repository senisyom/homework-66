import { useCallback, useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import axiosApi from "../../axiosAPI";
import { Meal, ApiMeal } from "../../types";
import { NavLink } from "react-router-dom";

interface TotalCaloriesProps {
  onTotalCalories: (caloriesNumber: number) => void;
}

const MealItem: React.FC<TotalCaloriesProps> = ({ onTotalCalories }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const fetchMeals = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get<Record<string, ApiMeal> | null>(
        "/meals.json"
      );
      const meals = response.data;

      if (meals) {
        const sortedMeals = Object.keys(meals)
          .map((id) => ({ ...meals[id], id }))
          .sort();
        setMeals(sortedMeals);
        const caloriesNumber = sortedMeals.reduce(
          (acc, meal) => acc + parseInt(meal.calories),
          0
        );
        onTotalCalories(caloriesNumber);
      } else {
        setMeals([]);
        onTotalCalories(0);
      }
    } finally {
      setLoading(false);
    }
  }, [onTotalCalories]);

  const deleteMeal = async (mealId: string) => {
    setDeleteLoading((prevState) => ({ ...prevState, [mealId]: true }));
    try {
      if (confirm("Вы точно хотите удалить эту запись?")) {
        await axiosApi.delete("/meals/" + mealId + ".json");
        await fetchMeals();
      }
    } finally {
      setDeleteLoading((prevState) => ({ ...prevState, [mealId]: false }));
    }
  };

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);
  return (
    <div className="container container-sm d-flex flex-column align-items-center">
      {loading ? (
        <Spinner />
      ) : meals.length > 0 ? (
        <div className="card w-75 m-5 shadow-lg">
          {meals.map((meal) => (
            <div key={meal.id} className="mb-4 border-bottom p-3">
              <div className="card-header text-black">
                <h5 className="mb-0">{meal.title}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{meal.description}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="font-weight-bold">{meal.calories} kcal</span>
                <div>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => deleteMeal(meal.id)}
                    disabled={deleteLoading[meal.id]}
                  >
                    {deleteLoading[meal.id] ? <Spinner /> : "Удалить"}
                  </button>
                  <NavLink
                    className="btn btn-secondary"
                    to={"/add-new-meal/" + meal.id + "/edit/"}
                  >
                    Изменить
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>Записей о приемах пищи пока нет...</h1>
      )}
    </div>
  );
};
export default MealItem;
