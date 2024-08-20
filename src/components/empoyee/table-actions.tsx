import { Trash } from "lucide-react";

type TableActionsProps = {
  onDelete: () => void;
};

export default function TableActions({ onDelete }: TableActionsProps) {
  return (
   <div>
      <button className="bg-red-500 text-white p-1 rounded" onClick={onDelete}>
        <Trash />
      </button>
    </div>
  );
}
