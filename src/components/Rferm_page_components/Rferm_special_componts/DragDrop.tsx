import React, { useEffect, useState } from "react";
import CardLogic from "./CardLogic";
import { Grid, Button, TextInput, Badge } from "@mantine/core";
import { useDrop } from "react-dnd";
import axios from "axios";

type Card = { id: number; mac_id: string; pit_name: string };

// const CardList = [
//   { id: 1, name: "card1" },
//   { id: 2, name: "card2" },
//   { id: 3, name: "card3" },
//   { id: 4, name: "card4" },
// ];

const DragDrop = () => {
  const [board, setBoard] = useState<Card[]>([]);
  const [isBoardVisible, setIsBoardVisible] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [cardList, setCardList] = useState<Card[]>([]);

  const [, drop] = useDrop(() => ({
    accept: "card",
    drop: (item: { id: number }) => addCardToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const persona = localStorage.getItem("persona");
  const useremail = localStorage.getItem("userEmail");

  useEffect(() => {
    interface Entry {
      mac_id: string;
      pit_name: string;
      // Add other properties if 'entry' has additional fields
    }
    const fetchCardList = async () => {
      try {
        console.log("Fetching card list data...");
        const response = await axios.post("/api/rferm/persona/data", {
          email: useremail,
          persona: persona,
        });

        const data = response.data.data;
        const transformedData = data.map((entry: Entry, index: number) => ({
          id: index + 1,
          mac_id: entry.mac_id,
          pit_name: entry.pit_name,
        }));
        setCardList(transformedData); // Populate the card list state with data from the API
        console.log("Card list data:", cardList);
      } catch (error) {
        console.error("Error fetching card list data:", error);
      }
    };

    fetchCardList();
  }, []);

  console.log("set Card list", cardList);

  const addCardToBoard = (id: number) => {
    console.log("id i get ", id);
    const CardList = cardList.filter((cardlist) => id === cardlist.id);
    setBoard((board) => [...board, CardList[0]]);
  };

  const toggleBoardVisibility = () => {
    setIsBoardVisible(!isBoardVisible);
  };

  const handleBoardNameSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    toggleBoardVisibility();
  };

  const handleBoardNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBoardName(event.target.value);
  };

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 0.5, lg: 0.5 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <div className="Cards">
            {cardList.map((card) => (
              <CardLogic key={card.id} name={card.pit_name} id={card.id} />
            ))}
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <div
            className="Board"
            ref={drop}
            style={{
              border: "5px solid red",
              height: "200px",
              width: "50%",
              display: isBoardVisible ? "block" : "none",
            }}
          >
            <Badge>{boardName}</Badge>
            {board.map((card) => (
              <CardLogic key={card.id} name={card.pit_name} id={card.id} />
            ))}
          </div>
          {!isBoardVisible && (
            <form onSubmit={handleBoardNameSubmit}>
              <TextInput
                required
                label="Enter Board Name"
                value={boardName}
                onChange={handleBoardNameChange}
              />
              <Button type="submit" mt="xl">
                Add Board
              </Button>
            </form>
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
    </>
  );
};

export default DragDrop;
