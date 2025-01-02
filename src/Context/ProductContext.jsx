import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

const ProductContext = createContext();
const initialState = {
  products: [],
  totalPages: 1,
  totalProducts: 0,
  currentPage: 1,
  featuredProducts: [],
  filters: {
    text: "",
    category: "all",
    brand: "all",
  },
};
const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        totalProducts: action.payload.totalProducts,
      };
    case "UPDATE_SEARCH":
      return {
        ...state,
        filters: { ...state.filters, text: action.payload },
      };
    case "UPDATE_BRAND":
      return {
        ...state,
        filters: { ...state.filters, brand: action.payload },
      };
    case "UPDATE_FILTER":
      return {
        ...state,
        filters: { ...state.filters, category: action.payload },
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          text: "",
          category: "all",
          brand: "all",
        },
      };
    default:
      return state;
  }
};
export const ProductProvider = ({ children }) => {
  const { URL } = useAuth();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryOpt, setCategoryOpt] = useState("");
  const [brandOpt, setBrandOpt] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [item, setItem] = useState([]);
  const [state, dispatch] = useReducer(productReducer, initialState);

  //pagination serching sorting base all products--------------------
  const fetchProducts = async (page) => {
    console.log(brand);
    
    try {
      const res = await fetch(
        `${URL}/product/all-products?page=${page}&limit=12&category=${category}&brand=${brand}&search=${search}&sort=${sort}`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      } else {
        const result = await res.json();
        dispatch({
          type: "SET_PRODUCTS",
          payload: {
            products: result.data.products,
            totalPages: result.data.pagination.totalPages,
            currentPage: result.data.pagination.currentPage,
            totalProducts: result.data.pagination.totalProducts,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts(1);
  }, [category, brand, search, sort]);
  // filter fetching -categories/brands----------------------
  const fetchFilters = async () => {
    try {
      const res = await fetch(`${URL}/product/all-products/filter`, {
        method: "GET",
      });
      const result = await res.json();
      const categories = ["All", ...new Set(result.data.category)];
      const brands = ["All", ...new Set(result.data.brand)];

      if (result.statusCode === 200) {
        setBrandOpt(brands);
        setCategoryOpt(categories);
        // console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFilters();
  }, []);
  // single product deatils----------------------------------
  const ProductDetails = async (id) => {
    const res = await fetch(`${URL}/product/all-products/product/${id}`, {
      method: "GET",
    });
    const result = await res.json();
    // console.log(result.data);
    if (result.statusCode === 200) {
      setItem(result.data);
      return { success: true, data: result.data };
    }
  };
  // console.log(item);
  //post a review ------------------------------------
  const postReview = async (id, data) => {
    console.log("product id:", id);
    console.log("product data:", data.comment, data.rating);

    const res = await fetch(`${URL}/product/all-products/product/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "comment":data.comment, "rating":data.rating }),
      credentials: "include",
    });
    const result = await res.json();
    if (result.statusCode === 200) {
      // ProductDetails(id)
      return ({ success: true, data: result.data });
      
    }
  };
  const clearFilters = () => {
    setCategory("");
    setBrand("");
    setSearch("");
    setSort("");
    dispatch({ type: "CLEAR_FILTERS" });
  };
  const setIsSearch = (search) => {
    console.log(search);
    setSearch(search);
    dispatch({ type: "UPDATE_SEARCH", payload: search });
  };
  const setIsBrand = (isBrand) => {
    console.log(isBrand);
    setBrand(isBrand);
    dispatch({ type: "UPDATE_BRAND", payload: isBrand });
  };
  const setIsCategory = (category) => {
    console.log(category);
    setCategory(category);
    dispatch({ type: "UPDATE_FILTER", payload: category });
  };
  const setSortOption = (value) => {
    console.log(value);
    setSort(value);
  };
  return (
    <ProductContext.Provider
      value={{
        ...state,
        fetchProducts,
        brandOpt,
        categoryOpt,
        setIsBrand,
        setIsCategory,
        setIsSearch,
        clearFilters,
        setSortOption,
        ProductDetails,
        item,
        postReview,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
