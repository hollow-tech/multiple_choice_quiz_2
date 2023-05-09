import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px 60px;
`;

const Btn = styled.button`
  background-color: #a645c9;
  padding: 20px;
  cursor: pointer;

  font-size: 16px;
  font-weight: 700;
  color: #fff;
  border-radius: 20px;
  border: none;
  margin-left: 20px;
`;

export const Main = (props) => {
  const [selectedOption, setSelectedOption] = React.useState("question1");
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedOption);
    props.setSelectData(selectedOption);
    navigate("/quiz");
  };
  return (
    <Container>
      <label htmlFor="questions" value={selectedOption}>
        <h2>Сұрақтар категориясы:</h2>
      </label>

      <form onSubmit={handleSubmit}>
        <select name="questions" id="questions" onChange={handleSelectChange}>
          <option value="questions1">1-50</option>
          <option value="questions2">51-100</option>
          <option value="questions3">101-150</option>
          <option value="questions4">151-200</option>
          
        </select>
        <Btn type="submit">кеттік бәрін таста</Btn>
      </form>
    </Container>
  );
};
