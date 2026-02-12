"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminFoodCard from "../_components/adminFoodCards";

export default function CategoriesWithItems() {
  const [categoriesWithFoods, setCategoriesWithFoods] = useState([]);

  const getAllData = async () => {
    try {
      const categoryRes = await axios.get("http://localhost:1000/category");
      const categories = categoryRes.data;

      const all = categories.map(async (cat) => {
        const foodsRes = await axios.get(
          `http://localhost:1000/food?categoryId=${cat._id}`
        );
        return { ...cat, foods: foodsRes.data };
      });

      setCategoriesWithFoods(await Promise.all(all));
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="p-5">
      {categoriesWithFoods.map((cat) => (
        <div className="mb-14" key={cat._id}>
          <h2 className="text-2xl font-bold mb-5">{cat.categoryName}</h2>

          <div className="grid grid-cols-3 gap-6">
            {cat.foods.map((food) => (
              <AdminFoodCard
                key={food._id}
                foodName={food.foodName}
                foodPrice={food.foodPrice}
                foodImage={food.foodImage}
                foodIngredients={food.foodIngredients}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
