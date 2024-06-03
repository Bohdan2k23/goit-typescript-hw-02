import { ImageData } from "../../lib/types";
import css from "./ImageCard.module.css";

type ImageCardProps = {
  picture: ImageData["results"][number];
  onClick: (src: string) => void;
};

export function ImageCard({ picture, onClick }: ImageCardProps) {
  return (
    <div>
      <div className={css.imgCardContainer}>
        <img
          onClick={() => onClick(picture.urls.regular)}
          className={css.imgItem}
          width={300}
          src={picture.urls.small}
          alt={picture.description}
        />
      </div>
    </div>
  );
}
