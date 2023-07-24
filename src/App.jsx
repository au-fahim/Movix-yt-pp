import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.scss'
import movixLogo from "/movix-logo.svg";
import { fetchDataFromApi } from "./utils/api";


import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";


import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import SearchResult from './pages/searchResult/SearchResult';
import PageNotFound from './pages/404/PageNotFound';


function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state?.home);

  useEffect(() => {
    testApi()
  }, [])

  const testApi = () => {
    fetchDataFromApi("/movie/popular").then((res) => {
        console.log(res);
        dispatch(getApiConfiguration(res))
      })
  }

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App
