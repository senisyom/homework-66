import React, { useState } from "react";
import { Meal } from "../../types";
import axiosApi from "../../axiosAPI";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const AddNewMeal: React.FC<{ meal?: Meal }> = ({ meal }) => {
  const [title, setTitle] = useState(meal?.title || "");
  const [description, setDescription] = useState(meal?.description || "");
  const [calories, setCalories] = useState(meal?.calories || "");
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !calories.trim()) {
      alert("Заполните все поля!");
      return;
    }

    const mealData: Meal = {
      id: meal ? meal.id : "",
      title: title.trim(),
      description: description.trim(),
      calories: calories.toString(),
    };

    try {
      setLoading(true);
      if (meal) {
        await axiosApi.put(`/meals/${meal.id}.json`, mealData);
      } else {
        const response = await axiosApi.post("/meals.json", mealData);
        const addedMeal = { ...mealData, id: response.data.name };
      }

      setTitle("");
      setDescription("");
      setCalories("");
      navigate("/");
    } catch (error) {
      console.error("Ошибка", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchMeal = async () => {
        try {
          const response = await axiosApi.get(`/meals/${id}.json`);
          const mealData = response.data;
          if (mealData) {
            setTitle(mealData.title);
            setDescription(mealData.description);
            setCalories(mealData.calories);
          }
        } catch (error) {
          console.error("Ошибка при загрузке блюда:", error);
        }
      };
      fetchMeal();
    }
  }, [id]);

  return (
    <div className="container w-50 mx-auto mt-4">
      <h2 className="mb-4">
        {meal ? "Редактировать блюдо" : "Добавить новое блюдо"}
      </h2>
      <form onSubmit={handleSubmit} className="meal-form">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Название
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Описание
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="calories" className="form-label">
            Калории
          </label>
          <input
            type="number"
            id="calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? "Сохранение..."
            : meal
            ? "Сохранить изменения"
            : "Добавить блюдо"}
        </button>
      </form>
    </div>
  );
};

export default AddNewMeal;
