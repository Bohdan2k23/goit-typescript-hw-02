import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import requestPictures from "./lib/requestPictures";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import SearchBar from "./components/SearchBar/SearchBar";

import "ldrs/hourglass";
import { Result } from "./lib/types";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>(null);
  const [pictures, setPictures] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoadinMore, setIsLoadinMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPictureSrc, setSelectedPictureSrc] = useState<string>("");

  useEffect(() => {
    if (!searchQuery || searchQuery === null) {
      setIsLoadinMore(false);
      setIsModalOpen(false);
      setIsError(false);
      return;
    }

    async function fetchPicturesByQuery() {
      try {
        setIsLoadinMore(false);
        setIsError(false);
        setIsModalOpen(false);
        setIsLoading(true);

        const data = await requestPictures(searchQuery, page);

        if (data.total === 0) {
          toast.error("Images not found");
          return;
        }

        if (data.total_pages > page) {
          setIsLoadinMore(true);
        }

        setPictures((prevState) => prevState.concat(data.results));
      } catch (err) {
        setIsError(true);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPicturesByQuery();
  }, [searchQuery, page]);

  const modal = {
    open() {
      setIsModalOpen(true);
    },
    close() {
      setSelectedPictureSrc(null);
      setIsModalOpen(false);
    },
  };

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    setPage(1);
    setPictures([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (picureSrc: string) => {
    setSelectedPictureSrc(picureSrc);
    modal.open();
  };

  return (
    <>
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearchQuery} />
      {isError && <ErrorMessage msg="error" />}
      <ImageGallery pictures={pictures} onClick={handleImageClick} />
      {isLoading && (
        <l-hourglass size="40" bg-opacity="0.1" speed="1.75" color="black"></l-hourglass>
      )}
      {isLoadinMore && <LoadMoreBtn loadMore={handleLoadMore} />}
      {isModalOpen && (
        <ImageModal src={selectedPictureSrc} onClose={modal.close} isOpen={isModalOpen} />
      )}
    </>
  );
}

function ErrorMessage({ msg }: { msg: string }) {
  return <div>{msg}</div>;
}
