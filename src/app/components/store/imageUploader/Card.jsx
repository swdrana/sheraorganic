import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FiXCircle } from "react-icons/fi";
import { ItemTypes } from "./ItemTypes.js";

const Card = ({ id, image, index, moveCard, handleRemoveImage }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the item's height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <div ref={ref} data-handler-id={handlerId}>
      <div className="position-relative">
        <img
          className="d-inline-flex border rounded border-light w-25 p-2 m-2"
          src={image}
          alt="product"
        />
        {index === 0 && (
          <p className="small position-absolute py-1 w-100 bottom-0 start-0 bg-primary rounded-pill text-white text-center">
            Default Image
          </p>
        )}
        <button
          type="button"
          className="position-absolute top-0 end-0 text-danger border-0 bg-transparent"
          onClick={() => handleRemoveImage(image)}
        >
          <FiXCircle />
        </button>
      </div>
    </div>
  );
};

export default Card;
