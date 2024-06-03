import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FormEventHandler } from "react";

type Props = {
  onSubmit: (query: string) => void;
};

export default function SearchBar({ onSubmit }: Props) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const values = new FormData(target);
    const query = values.get("query") as string | null;
    const trimmedQuery = query?.trim() || "";

    if (!trimmedQuery) {
      toast.error("Enter the query string");
      return;
    }
    onSubmit(trimmedQuery);

    target.reset();
  };

  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.formField}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
