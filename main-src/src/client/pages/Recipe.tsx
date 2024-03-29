import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Search from "../components/Search";
import Category from "../components/Category";
import axios from "axios";
import { Box } from '@mui/material';


const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const params = useParams();

  const fetchDetails = async () => {
    const resp = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${
        import.meta.env.VITE_RECIPE_KEY
      }`
    );
    const data = await resp.json();
    console.log(data);

    return data;
  };

  useEffect(() => {
    let isMounted = true;

    fetchDetails().then((data) => {
      if (isMounted) setDetails(data);
    });
    return () => {
      isMounted = false;
    };
  }, [params.id]);

  const handleSubmit = () => {
    const userId = sessionStorage.getItem("userId");
    const mealType = document.getElementById("mealType") as HTMLSelectElement;
    const mealDate = document.getElementById("mealDate") as HTMLInputElement;
    const imgUrl = details.image;
    const mealName = details.title;
    const calories = (document.getElementById("calories") as HTMLInputElement).value;
    const description = details.summary;
    const meal = {
      userId: userId,
      mealName: mealName,
      description: description,
      calories: calories,
      date: mealDate.value,
      type: mealType.value,
      urlImage: imgUrl,
    };
    axios.post("/meals/add", meal).then((res) => { 
      console.log(res.data);
      alert("Meal added successfully");
    })
    .catch((err) => {
      console.log(err);
      alert("Error adding meal");
    });
  };

  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <div style={{ textAlign: 'left' }}>

      <Nav />
      <Search />
      <Category />
      <Wrapper>
        <div>
          <h2>{details.title}</h2>
          <img src={details.image} alt={details.title} />
          <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
        </div>
        <Info>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          {activeTab === "ingredients" && (
            <ul>
              {details.extendedIngredients.map(({ id, original }) => (
                <li key={id}>{original}</li>
              ))}
            </ul>
          )}

          {activeTab === "instructions" && (
            <div>
              <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
            </div>
          )}
        </Info>
      </Wrapper>
      <Wrapper2>
        <h2>Add {details.title} to meal plan</h2>
        <div>
          <label htmlFor="calories">Calories:</label>
          <input type="number" id="calories" />
          <select id="mealType">
            <option value="Meal">Meal</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
          <input type="date" id="mealDate"/>
          <Button className={"addMeal"} onClick={() => handleSubmit()}>
            Add to meal plan
          </Button>
        </div>
      </Wrapper2>
      <Nav />
      </div>
    </Box>
  );
};

const Nav = styled.div`
  padding: 3rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Wrapper = styled.div`
  padding-top:3rem;
  margin: 10rem inherit 5rem;
  display: flex;

  @media (max-width: 1068px) {
    flex-direction: column;
    flex:1;
  }
  
  div {
    flex: 1;
  }

  .active {
    background: linear-gradient(to right, #f27121, #e94057);
    color: #fff;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  ul {
    margin-top: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  p {
    padding-top: 2rem;
    margin: 1rem 0;
    font-size: 1.2rem;
    line-height: 1.8rem;
    max-width: 500px
    &:first-child {
      margin-top: 2rem;
    }
  }
`;

const Wrapper2 = styled.div`
  padding: 3rem;
  margin: 20rem inherit 5rem;
  margin-top: 40px;
  display: block;
  background: #ffd9cb;
  border-radius: 20px;

  div {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }

  .addMeal {
    margin-left: 250px;
    background: linear-gradient(to right, #f27121, #e94057);
    color: #fff;
    &:hover {
      transform: scale(1.1);
    }
  }

  select,
  input{
    flex: 1;
    width: 90px;
    height: 40px; /* Adjust the height as needed */
    font-size: 16px; /* Adjust the font size as needed */
    margin-right: 50px; /* Add some space between select and input */
  }

  select {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
  }

  input {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(100%);
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
  font-size: 1rem;
`;

const Info = styled.div`
  margin-left: 5rem;

  @media (max-width: 1068px) {
    margin-top: 3rem;
    margin-left: 1rem;
  }
`;

export default Recipe;
