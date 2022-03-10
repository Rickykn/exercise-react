import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Box,
  Button,
  Text,
  Flex,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../configs/api";
import { useSearchParams } from "react-router-dom";

const UserCard = ({ firstName, lastName, gender, jobArea }) => {
  return (
    <Tr>
      <Td>{firstName}</Td>
      <Td>{lastName}</Td>
      <Td>{gender}</Td>
      <Td>{jobArea}</Td>
    </Tr>
  );
};

const UserDataPage = () => {
  const [userList, setUserList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
  );

  const [searchInput, setSearchInput] = useState("");
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );

  const pageLimit = 8;

  const fetchUser = (
    queryParams = {
      params: {
        _limit: pageLimit,
      },
    }
  ) => {
    axiosInstance
      .get("/users", queryParams)
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        alert("Terjadi kesalahan pada server");
      });
  };

  const inputHandler = (event) => {
    const { value } = event.target;
    setSearchInput(value);
  };

  const searchButtonHendler = () => {
    if (searchInput) {
      setCurrentPage(1);
      setSearchValue(searchInput);

      setSearchParams({
        page: 1,
        search: searchInput,
      });
    } else {
      setCurrentPage(1);
      setSearchValue("");
      setSearchParams({
        page: 1,
      });
    }
  };

  const paginationHandler = (direction = "next") => {
    let newPage = currentPage;
    if (direction === "prev" && currentPage === 1) {
      return;
    }
    if (direction === "next") {
      newPage += 1;
    } else if (direction === "prev") {
      newPage -= 1;
    }
    setCurrentPage(newPage);

    if (searchValue) {
      setSearchParams({
        page: newPage,
        search: searchValue,
      });
    } else {
      setSearchParams({
        page: newPage,
      });
    }
  };

  useEffect(() => {
    let _page = searchParams.get("page");
    let gender = searchParams.get("search");
    fetchUser({
      params: {
        _limit: pageLimit,
        _page: _page,
        gender: gender ? gender : undefined,
      },
    });
  }, [currentPage, searchValue]);

  const renderUser = () => {
    return userList.map((val) => {
      return (
        <UserCard
          firstName={val.first_name}
          lastName={val.last_name}
          gender={val.gender}
          jobArea={val.job_area}
        />
      );
    });
  };

  return (
    <Center marginTop="5" display="flex" flexDirection="column">
      <Flex marginBottom="3">
        <Select
          defaultValue={searchValue}
          onChange={inputHandler}
          placeholder="Select option"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>
        <Button onClick={searchButtonHendler}>Search</Button>
      </Flex>
      <Flex justifyContent="center" marginBottom="3">
        <Button
          marginX="2"
          onClick={() => {
            paginationHandler("prev");
          }}
        >
          Previous Page
        </Button>
        <Text fontSize="2xl">{currentPage}</Text>
        <Button
          marginX="2"
          onClick={() => {
            paginationHandler("next");
          }}
        >
          Next Page
        </Button>
      </Flex>
      <Box border="1px" borderRadius="lg">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Gender</Th>
              <Th>jobArea</Th>
            </Tr>
          </Thead>
          <Tbody>{renderUser()}</Tbody>
        </Table>
      </Box>
    </Center>
  );
};
export default UserDataPage;
