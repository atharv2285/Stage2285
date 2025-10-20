import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

export default function DraggableSection({ id, children, isDragging = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-8 top-4 cursor-grab active:cursor-grabbing opacity-0 hover:opacity-100 transition-opacity z-10"
      >
        <GripVertical className="text-gray-400" size={24} />
      </div>
      {children}
    </div>
  )
}
