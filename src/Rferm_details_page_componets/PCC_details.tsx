import _React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Modal,
  Pagination,
  SimpleGrid,
  Select,
  TextInput,
  Button,
  Group,
  Loader,
} from "@mantine/core";
// import { Details } from "../components/testingData/Details";
import PitCard from "../components/Rferm_page_components/Rferm_special_componts/PitCard";
import CardModal from "../components/Rferm_page_components/Rferm_special_componts/CardModal";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";

interface SelectedPitStructure {
  pit_name: string;
  status: string;
  battery: number;
  latest: number;
  fault_count: number;
  ground_step: number;
  ground_touch: number;
  lightning_step: number;
  lightning_touch: number;
  mac_id: string;
}

const PCC_details = () => {
  const cardName = localStorage.getItem("cardname");

  const totalPitsString = localStorage.getItem("totalpits");
  const totalPits = totalPitsString ? parseInt(totalPitsString, 10) : 0;
  const itemsPerPage = 12;
  const icon = <IconSearch stroke={2} />;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(cardName);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SelectedPitStructure[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedPitData, setSelectedPitData] =
    useState<SelectedPitStructure | null>(null);

  const [personaData, setPersonaData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const persona = localStorage.getItem("persona");
  const useremail = localStorage.getItem("userEmail");

  // Set the default base URL for Axios
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;

  useEffect(() => {
    const fetchPersonaData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.post("/api/rferm/persona/data", {
          email: useremail,
          persona: persona,
        });
        setPersonaData(response.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 10);
      } catch (error) {
        console.error("Error fetching map data:", error);
        setIsLoading(false);
      }
    };

    fetchPersonaData();
  }, []);

  const handleCardClick = (pitData: SelectedPitStructure) => {
    setSelectedPitData(pitData);
    open();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Here we were passing the Detials, which needed to be changed to personaData

  const handleSearchByPitName = () => {
    const result = personaData.filter((pit) =>
      pit.pit_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResult(result);
  };

  const handleClearSearch = () => {
    setSearchResult([]);
    setSearchValue("");
  };

  const handleSelectChange = (value: string) => {
    setSelectedFilter(value);
    setSearchResult([]); // Reset search results when select changes
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("cardname");
    };
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, totalPits);

  // Here we were passing the Detials, which needed to be changed to personaData
  const filteredPitData = personaData.filter((pit) => {
    if (!selectedFilter || selectedFilter === "") {
      return true; // No filter selected, show all
    }

    switch (selectedFilter) {
      case "Danger":
      case "Unhealthy":
      case "Healthy":
        return pit.status === selectedFilter;
      case "lt10":
        return pit.battery < 10;
      case "10to50":
        return pit.battery >= 10 && pit.battery <= 50;
      case "gt50":
        return pit.battery > 50;
      case "lt10fault":
        return pit.fault_count < 10;
      case "10to20fault":
        return pit.fault_count >= 10 && pit.fault_count <= 20;
      case "gt20fault":
        return pit.fault_count > 20;
      default:
        return false; // Invalid filter option
    }
  });

  if (isLoading) {
    return (
      <div>
        {" "}
        <Loader
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  }

  return (
    <>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <Group mb="xl" justify="space-between">
            <Select
              data={[
                { label: "All", value: "" },
                { label: "Danger", value: "Danger" },
                { label: "Unhealthy", value: "Unhealthy" },
                { label: "Healthy", value: "Healthy" },
                { label: "Battery < 10", value: "lt10" },
                { label: "Battery 10 - 50", value: "10to50" },
                { label: "Battery > 50", value: "gt50" },
                { label: "Fault < 10", value: "lt10fault" },
                { label: "Fault 10 - 20", value: "10to20fault" },
                { label: "Fault > 20", value: "gt20fault" },
              ]}
              placeholder="Select status"
              value={selectedFilter}
              onChange={(value) => handleSelectChange(value || "")}
              radius="md"
              mt="xl"
            />
            <Group>
              <TextInput
                leftSection={icon}
                value={searchValue}
                onChange={(event) => setSearchValue(event.currentTarget.value)}
                placeholder="Search by pit name"
                radius="md"
                mt="xl"
              />
              <Button mt="xl" onClick={handleSearchByPitName}>
                Search
              </Button>
              <Button mt="xl" onClick={handleClearSearch}>
                Clear
              </Button>
            </Group>
          </Group>

          <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="lg">
            {(searchResult.length > 0 ? searchResult : filteredPitData)
              .slice(startIndex, endIndex)
              .map((personaData, index) => (
                <PitCard
                  key={index}
                  pitData={personaData}
                  onClick={() => handleCardClick(personaData)}
                />
              ))}
          </SimpleGrid>
          <Pagination
            mt="xl"
            value={currentPage}
            onChange={handlePageChange}
            total={Math.ceil(
              (searchResult.length > 0 ? searchResult : filteredPitData)
                .length / itemsPerPage
            )}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      <Modal opened={opened} onClose={close} size="calc(100vw - 3rem)">
        {selectedPitData && <CardModal pitData={selectedPitData} />}
      </Modal>
    </>
  );
};

export default PCC_details;
