import React from "react";
import styled from "styled-components";
import { data1 } from "./Quiz_1.data";
import { data2 } from "./Quiz_2.data";
import { data3 } from "./Quiz_3.data";
import { data4 } from "./Quiz_4.data";
import { data5 } from "./Quiz_5.data";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  list-style: none;
  font-size: 24px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const Question = styled.div`
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  font-size: 24px;
`;

const Choice = styled.a`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 10px 10px;
  border: 1px solid #000;
  /* background-color: red; */
`;

const ListInner = styled.ul`
  padding: 0;
`;

const Btns = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 30px;
  justify-content: center;
`;

const Btn = styled.button`
  background-color: #2596be;
  padding: 30px;
  cursor: pointer;
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  border-radius: 20px;
  border: none;
  margin-left: 20px;
`;

const Answer = styled.div`
  display: none;
`;
const Counter = styled.div`
  color: blue;
  text-align: center;
  font-size: 30px;
`;

export const Quiz_1 = (props) => {
  const [page, setPage] = React.useState(1); // Set the initial page number
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [key, setKey] = React.useState("");
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [currentRange, setCurrentRange] = React.useState([]);

  const itemsPerPage = 1; // Set the number of items per page

  const startIndex = (page - 1) * itemsPerPage; // Calculate the start index
  const endIndex = startIndex + itemsPerPage; // Calculate the end index

  // const choicesList = data.choices.map((item, index) => `${index + 1}. ${item}`);
  const paginatedData = currentRange.slice(startIndex, endIndex);

  React.useEffect(() => {
    console.log(`${props.selectData} this is in quiz`);
    switch (props.selectData) {
      case "questions1":
        setCurrentRange(data1);
        break;
      case "questions2":
        setCurrentRange(data2);
        break;
      case "questions3":
        setCurrentRange(data3);
        break;
      case "questions4":
        setCurrentRange(data4);
        break;
      case "questions5":
        setCurrentRange(data5);
        break;
      // Default to data1 if the selected option is not recognized
      default:
        setCurrentRange(data1);
        break;
    }
    // Reset the page number when the data changes
    setPage(1);
  }, [props.selectedOption]);

  function handleNextClick() {
    setPage((prevPage) => prevPage + 1); // Increment the page number
    setIsCorrect(false);
  }

  function handlePrevClick() {
    setPage((prevPage) => prevPage - 1); // Decrement the page number
  }
  // const randomizedArray = data.choices.sort(() => Math.random() - 0.5);

  // // Re-render the data when the page changes
  // React.useEffect(() => {
  //   updatePage();
  // }, [page]);

  const errorHandler = (choice, key) => {
    if (choice === key) {
      setIsCorrect(true);
      setCounter(counter + 1);
    }
  };

  return (
    <div>
      <Container>
        <List>
          {paginatedData.map(({ question, id, choices, key }) => (
            <li id={id}>
              <Question>{question}</Question>
              <Answer>{key}</Answer>
              <ListInner>
                {choices
                  .sort(() => Math.random() - 0.5)
                  .map((choice, index) => (
                    <Choice>
                      <ListItem
                        key={index}
                        onClick={() => errorHandler(choice, key)}
                        style={{ backgroundColor: isCorrect && choice === key ? "green" : "" }}
                      >
                        {choice}
                      </ListItem>
                    </Choice>
                  ))}
              </ListInner>
            </li>
          ))}
        </List>
        <Btns>
          <Btn disabled={page === 1} onClick={handlePrevClick}>
            артқа
          </Btn>
          <Btn disabled={currentRange.length <= page * itemsPerPage} onClick={handleNextClick}>
            келесі
          </Btn>
        </Btns>
        <Counter>
          {counter}/{currentRange.length}
        </Counter>
      </Container>
    </div>
  );
};
