import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';
import Pagination from '../UI/Pagination';


const AvailableMeals = () => {
  const [isloading, setIsLoading] = useState(false)
  const [allMeals, setAllMeals] = useState([])
  const [meals, setMeals] = useState([])
  const [httpError, setHttpError] = useState()
  const [firstLoaded, setFirstLoaded] = useState(true)
  //
  let itemLimit = 4
  const [pageNumber, setPageNumber] = useState(1)
  //

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true)
      const res = await fetch('https://reactmeals5420-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')

      if (!res.ok) {
        throw new Error('Something went wrong!')
      }

      const resData = await res.json()

      const loadedMeals = []

      for (const key in resData) {
        loadedMeals.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price
        })
      }
      let itemsByPage = []
      for (let i = 0; i < itemLimit; i++) {
        !!loadedMeals[i + itemLimit * (pageNumber - 1)] && itemsByPage.push(loadedMeals[i + itemLimit * (pageNumber - 1)])
      }
      setAllMeals(loadedMeals)
      setMeals(itemsByPage)
      setIsLoading(false)
    }

    fetchMeals().catch((err) => {
      setIsLoading(false)
      setHttpError(err.message)
    })


  }, [itemLimit, pageNumber])

  if (isloading) {
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>Something wrong happened!</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={firstLoaded ? classes.mealsAnimation : classes.meals}>
      {/* {isloading && <p>Loading...</p>} */}
      <Card>
        <ul>{mealsList}</ul>
        <Pagination
          itemNum={allMeals.length}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          itemLimit={itemLimit}
          setFirstLoaded={setFirstLoaded}
        />
      </Card>
    </section>
  );
};

export default AvailableMeals;
