import React from "react";
import styled from "styled-components";
import { data1 } from "./Quiz_1.data";
import { data2 } from "./Quiz_2.data";
import { data3 } from "./Quiz_3.data";
import { data4 } from "./Quiz_4.data";
import { data5 } from "./Quiz_5.data";

const Wrapper = styled.div`
  height: 100vh;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  list-style: none;
  font-size: 24px;
  padding: 17px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
  min-height: 100%;
`;

const Question = styled.div`
  font-size: 16px;
  font-weight: 700;
  padding: 0 20px 10px 20px;
  font-size: 24px;
`;

const Choice = styled.a`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 1px solid #000;
  margin-bottom: 10px;
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
  padding: 0 15px;
  margin-bottom: 30px;
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
`;

const Answer = styled.div`
  display: none;
`;
const Counter = styled.div`
  color: blue;
  text-align: center;
  font-size: 30px;
  flex: 1 1 auto;
`;

export const Quiz_1 = (props) => {
  const [page, setPage] = React.useState(1); // Set the initial page number
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [currentRange, setCurrentRange] = React.useState([]);
  const [shuffledChoices, setShuffledChoices] = React.useState([]);

  const itemsPerPage = 1; // Set the number of items per page

  const startIndex = (page - 1) * itemsPerPage; // Calculate the start index
  const endIndex = startIndex + itemsPerPage; // Calculate the end index

  // const choicesList = data.choices.map((item, index) => `${index + 1}. ${item}`);
  const paginatedData = currentRange.slice(startIndex, endIndex);

  React.useEffect(() => {
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

    const shuffled = currentRange.map((item) => ({
      ...item,
      choices: item.choices.sort(() => Math.random() - 0.5),
    }));
    setShuffledChoices(shuffled);
    // Reset the page number when the data changes
    setPage(1);
  }, [props.selectData, currentRange]);

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

  function errorHandler(choice, key, id) {
    if (choice === key) {
      setIsCorrect(true);
      setCounter(counter + 1);
      const updatedData = shuffledChoices.map((item) =>
        item.id === id
          ? {
              ...item,
              choices: item.choices.map((c) =>
                c === key ? (
                  <ListItem
                    key={key}
                    style={{
                      backgroundColor: "green",
                    }}
                  >
                    {c}
                  </ListItem>
                ) : (
                  <ListItem
                    key={c}
                    onClick={() => errorHandler(c, key, id)}
                    style={{
                      backgroundColor: isCorrect && c === key ? "green" : "",
                      cursor: isCorrect ? "default" : "pointer",
                    }}
                  >
                    {c}
                  </ListItem>
                ),
              ),
            }
          : item,
      );
      setShuffledChoices(updatedData);
    }
  }

  return (
    <Wrapper>
      <Container>
        <List>
          {paginatedData.map(({ question, id, choices, key }) => (
            <li id={id}>
              <Question>{question}</Question>
              <Answer>{key}</Answer>
              <ListInner>
                {choices.map((choice, index) => (
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
        <Counter>
          {counter}/{currentRange.length}
        </Counter>
        <Btns>
          <Btn disabled={page === 1} onClick={handlePrevClick}>
            артқа
          </Btn>
          <Btn disabled={currentRange.length <= page * itemsPerPage} onClick={handleNextClick}>
            келесі
          </Btn>
        </Btns>
      </Container>
    </Wrapper>
  );
};
