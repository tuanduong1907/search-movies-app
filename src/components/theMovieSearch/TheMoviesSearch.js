import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const TheMoviesSearch = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/search/movie?api_key=4a2a3dc8902cef803be0cb4f46ab9fde&query='${query}'`
  );
  useEffect(() => {
    async function handleFetchData() {
      setLoading(true);
      try {
        const res = await axios.get(url);
        if (res.data.results) {
          setMovies(res.data.results);
          setLoading(false);
        }
      } catch (error) {}
    }
    handleFetchData();
  }, [url]);
  return (
    <div className="p-3 lg:p-10">
      <div className="flex gap-x-3 mx-auto w-full lg:w-[550px] h-[40px] lg:h-[60px] mb-5 lg:mb-[80px]">
        <div className="relative w-full h-full flex items-center">
          <input
            type="text"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-full p-5 text-base border border-blue-500 border-solid rounded-lg focus:shadow-[0px_0px_0px_3px_rgba(125,106,255,0.2)] transition-all"
          />
          {query.length > 0 && (
            <button onClick={() => setQuery("")} className="absolute right-3">
              <AiOutlineClose></AiOutlineClose>
            </button>
          )}
        </div>
        <button
          onClick={() =>
            setUrl(
              `https://api.themoviedb.org/3/search/movie?api_key=4a2a3dc8902cef803be0cb4f46ab9fde&query='${query}'`
            )
          }
          className="flex justify-center items-center flex-shrink-0 h-full w-10 sm:w-auto lg:w-auto sm:px-5 lg:px-5 bg-blue-500 text-white font-semibold rounded-full sm:rounded-lg lg:rounded-lg hover:opacity-80 transition-all"
        >
          <FiSearch className="text-xl lg:text-2xl"></FiSearch>
        </button>
      </div>
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <MovieItemLoading></MovieItemLoading>
          <MovieItemLoading></MovieItemLoading>
          <MovieItemLoading></MovieItemLoading>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {!loading &&
          movies.length > 0 ?
          movies.map((item) => (
            <MovieItem key={item.id} data={item}></MovieItem>
          )) : !loading && <span className="fixed top-[20vh] -translate-x-2/4 left-2/4 text-red-500 text-xl font-medium select-none">Not Find Movie</span>}
      </div>
    </div>
  );
};

const MovieItemLoading = () => {
  return (
    <div className="flex flex-col p-[10px] bg-white rounded-lg shadow-md">
      <div className="w-full h-[300px] rounded-lg">
        <LoadingSkeleton height="100%" radius="16px"></LoadingSkeleton>
      </div>
      <div className="p-[30px] flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-4">
          <LoadingSkeleton height="20px"></LoadingSkeleton>
        </h3>
        <div className="text-sm text-[#999] mb-[27px]">
          <LoadingSkeleton height="10px"></LoadingSkeleton>
          <div className="h-2"></div>
          <LoadingSkeleton height="10px"></LoadingSkeleton>
          <div className="h-2"></div>
          <LoadingSkeleton height="10px"></LoadingSkeleton>
        </div>
        <div className="flex items-center gap-x-2 mt-auto">
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.66713 1.02447C7.7719 0.702008 8.2281 0.702009 8.33287 1.02447L9.71753 5.28602C9.76439 5.43023 9.89877 5.52786 10.0504 5.52786H14.5313C14.8703 5.52786 15.0113 5.96173 14.737 6.16102L11.1119 8.7948C10.9892 8.88393 10.9379 9.04191 10.9847 9.18612L12.3694 13.4477C12.4742 13.7701 12.1051 14.0383 11.8308 13.839L8.20572 11.2052C8.08305 11.1161 7.91695 11.1161 7.79428 11.2052L4.16918 13.839C3.89488 14.0383 3.52581 13.7701 3.63059 13.4477L5.01525 9.18612C5.06211 9.04191 5.01078 8.88393 4.88811 8.7948L1.26301 6.16102C0.988711 5.96173 1.12968 5.52786 1.46874 5.52786H5.9496C6.10123 5.52786 6.23561 5.43023 6.28247 5.28602L7.66713 1.02447Z"
              stroke="#FFB86C"
              strokeWidth="1.5"
            />
          </svg>
          <span className="text-sm font-semibold">
            <LoadingSkeleton height="10px" width="50px"></LoadingSkeleton>
          </span>
        </div>
      </div>
    </div>
  );
};

const MovieItem = ({ data }) => {
  return (
    <div className="flex flex-col p-[10px] bg-white rounded-lg shadow-md">
      <div className="w-full h-[300px] rounded-lg">
        <img
          src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
          alt=""
          className="w-full h-full object-cover rounded-lg select-none"
        />
      </div>
      <div className="p-[30px] flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-4">{data.title}</h3>
        <p className="text-sm text-[#999] mb-[27px]">{data.overview}</p>
        <div className="flex items-center gap-x-2 mt-auto">
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.66713 1.02447C7.7719 0.702008 8.2281 0.702009 8.33287 1.02447L9.71753 5.28602C9.76439 5.43023 9.89877 5.52786 10.0504 5.52786H14.5313C14.8703 5.52786 15.0113 5.96173 14.737 6.16102L11.1119 8.7948C10.9892 8.88393 10.9379 9.04191 10.9847 9.18612L12.3694 13.4477C12.4742 13.7701 12.1051 14.0383 11.8308 13.839L8.20572 11.2052C8.08305 11.1161 7.91695 11.1161 7.79428 11.2052L4.16918 13.839C3.89488 14.0383 3.52581 13.7701 3.63059 13.4477L5.01525 9.18612C5.06211 9.04191 5.01078 8.88393 4.88811 8.7948L1.26301 6.16102C0.988711 5.96173 1.12968 5.52786 1.46874 5.52786H5.9496C6.10123 5.52786 6.23561 5.43023 6.28247 5.28602L7.66713 1.02447Z"
              stroke="#FFB86C"
              strokeWidth="1.5"
            />
          </svg>
          <span className="text-sm font-semibold">{data.vote_average}</span>
        </div>
      </div>
    </div>
  );
};

export default TheMoviesSearch;
