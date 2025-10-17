import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableActionProps {
  id: string;
  text: string;
  index: number;
  submitted: boolean;
}

export const SortableAction = ({ id, text, index, submitted }: SortableActionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-4 bg-card border rounded-lg ${
        !submitted ? "cursor-move hover:border-primary hover:shadow-md" : ""
      } transition-all`}
      {...attributes}
      {...listeners}
    >
      {!submitted && (
        <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      )}
      <span className="font-semibold text-primary mr-2">{index + 1}.</span>
      <span className="flex-1">{text}</span>
    </div>
  );
};
