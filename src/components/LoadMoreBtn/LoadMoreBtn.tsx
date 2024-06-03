import css from "./LoadMoreBtn.module.css";

type Props = {
  loadMore: () => void;
};

export default function LoadMoreBtn({ loadMore }: Props) {
  return (
    <button className={css.loadMoreBtn} onClick={loadMore}>
      Load More
    </button>
  );
}
