import { Box, Text, Input, Center, FormLabel, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { axiosInstance } from "../configs/api";
import { useSearchParams } from "react-router-dom";

const ProductCard = ({ productName, price, category }) => {
  return (
    <Box
      margin="2"
      padding="4"
      borderWidth={3}
      borderRadius="4px"
      width="150px"
    >
      <Text>{productName}</Text>
      <Text>Rp. {price}</Text>
      <Text>{category}</Text>
    </Box>
  );
};

const ProductPage = () => {
  const [productList, setProductList] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );

  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
  );

  const pageLimit = 3;

  const inputHandler = (event) => {
    const { value } = event.target;

    setSearchInput(value);
  };

  const fetchProduct = (
    queryParams = {
      params: {
        _limit: pageLimit,
      },
    }
  ) => {
    axiosInstance
      .get("/products", queryParams)
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan pada server");
      });
  };

  const searchButtonHandler = () => {
    // axiosInstance
    //   .get("/products", {
    //     params: {
    //       product_name: searchInput,
    //     },
    //   })
    //   .then((res) => {
    //     setProductList(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    if (searchInput) {
      setSearchValue(searchInput);
      setCurrentPage(1);

      setSearchParams({
        page: 1,
        search: searchInput,
      });
    } else {
      setSearchValue("");
      setSearchParams({
        page: 1,
      });
    }
  };

  //   const searchOnChange = (event) => {
  //     const { value } = event.target;

  //     fetchProduct({
  //       params: {
  //         product_name: value ? value : undefined,
  //       },
  //     });
  //   };

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
    let product_name = searchParams.get("search");
    let _page = searchParams.get("page");

    fetchProduct({
      params: {
        _limit: pageLimit,
        _page: _page,
        product_name: product_name,
      },
    });
  }, [currentPage, searchValue]);

  //   useEffect(() => {
  //     const searchQueryParams = searchParams.get("search");

  //     if (searchParams) {
  //       setSearchValue(searchQueryParams);
  //     }
  //   }, []);

  const renderProducts = () => {
    return productList.map((val) => {
      return (
        <ProductCard
          productName={val.product_name}
          price={val.price}
          category={val.category}
        />
      );
    });
    // return productList.map((val) => {
    //     if (val.product_name.toLowerCase().includes(searchValue.toLowerCase())) {
    //       return (
    //         <ProductCard
    //           productName={val.product_name}
    //           price={val.price}
    //           category={val.category}
    //         />
    //       );
    //     }
    //   });
  };

  return (
    <Center>
      <Box width="xl">
        <Text fontSize="2xl" marginBottom="8">
          Product Page
        </Text>
        <FormLabel htmlFor="searchProduct">Product Name</FormLabel>
        <Input onChange={inputHandler} id="searchProduct" />
        <Button onClick={searchButtonHandler}>Search</Button>

        <Flex wrap="wrap">{renderProducts()}</Flex>
        <Flex justifyContent="center">
          <Button
            onClick={() => {
              paginationHandler("prev");
            }}
            marginX="2"
          >
            Previous Page
          </Button>
          <Button
            marginX="2"
            onClick={() => {
              paginationHandler("next");
            }}
          >
            Next Page
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default ProductPage;
