import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  UseSortableArguments,
} from "@dnd-kit/sortable";
import { Grip, GripHorizontal, GripVertical } from "lucide-react";
import React from "react";
import { TableCell, TableRow } from "./table";
import { slice } from "lodash";

// Types
interface DraggableItem {
  id: string;
  disabled?: boolean;
  [key: string]: any;
}

interface DraggableCardsProps<T extends DraggableItem> {
  items: T[];
  onReorder: (newItems: T[]) => void;
  renderItem?: (item: T) => React.ReactNode;
  containerClassName?: string;
  cardClassName?: string;
  dragHandleClassName?: string;
  styleIcon?: string;
  layout?: "grid" | "flex" | null;
  columns?: 1 | 2 | 3 | 4 | 6;
  disableDrag?: boolean;
  showDragHandle?: boolean;
  showContainer?: boolean;
  gripType?: "horizontal" | "vertical" | "default";
  children?: any;
}

// Draggable Card Component
const SortableCard = React.memo(
  ({
    id,
    children,
    className,
    dragHandleClassName,
    styleIcon,
    disabled = false,
    disableDrag = false,
    showDragHandle = false,
    gripType = "default",
  }: {
    id: string;
    children: React.ReactNode;
    className?: string;
    dragHandleClassName?: string;
    styleIcon?: string;
    disabled?: boolean;
    disableDrag?: boolean;
    showDragHandle?: boolean;
    gripType?: "horizontal" | "vertical" | "default";
  }) => {
    const sortableArgs: UseSortableArguments = {
      id,
      disabled: disabled || disableDrag,
    };

    const GripIcon =
      gripType === "horizontal"
        ? GripHorizontal
        : gripType === "vertical"
          ? GripVertical
          : Grip;

    if (showDragHandle) {
      sortableArgs.attributes = {
        role: "button",
        tabIndex: 0,
      };
    }

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
      setActivatorNodeRef,
    } = useSortable(sortableArgs);

    const style = {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      transition,
      zIndex: isDragging ? 50 : undefined,
    };

    return (
      <Card
        ref={setNodeRef}
        style={style}
        className={cn(
          "touch-none",
          !disabled && !disableDrag && isDragging && "shadow-sm",
          className
        )}
        {...attributes}
      >
        {showDragHandle && !disabled && !disableDrag && (
          <div
            ref={setActivatorNodeRef}
            className={cn("cursor-move p-2", dragHandleClassName)}
            {...listeners}
          >
            <GripIcon className={cn("h-4 w-4 text-slate-500", styleIcon)} />
          </div>
        )}
        <CardContent className='p-0'>
          {showDragHandle ? (
            children
          ) : (
            <div {...(!disabled && !disableDrag ? listeners : {})}>
              {children}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

SortableCard.displayName = "SortableCard";

// Draggable Card Component
const SortableTableRow = React.memo(
  ({
    id,
    children,
    className,
    dragHandleClassName,
    styleIcon,
    disabled = false,
    disableDrag = false,
    showDragHandle = false,
    gripType = "default",
  }: {
    id: string;
    children: React.ReactNode;
    className?: string;
    dragHandleClassName?: string;
    styleIcon?: string;
    disabled?: boolean;
    disableDrag?: boolean;
    showDragHandle?: boolean;
    gripType?: "horizontal" | "vertical" | "default";
  }) => {
    const sortableArgs: UseSortableArguments = {
      id,
      disabled: disabled || disableDrag,
    };

    const GripIcon =
      gripType === "horizontal"
        ? GripHorizontal
        : gripType === "vertical"
          ? GripVertical
          : Grip;

    if (showDragHandle) {
      sortableArgs.attributes = {
        role: "button",
        tabIndex: 0,
      };
    }

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
      setActivatorNodeRef,
    } = useSortable(sortableArgs);

    const style = {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      transition,
      zIndex: isDragging ? 50 : undefined,
    };

    return (
      // <div
      //   ref={setNodeRef}
      //   style={style}
      //   className={cn(
      //     "touch-none",
      //     !disabled && !disableDrag && isDragging && "shadow-sm",
      //     className
      //   )}
      //   {...attributes}
      // >
      <TableRow
        // key={item.id}
        // data-state={item.getIsSelected() && "selected"}
        ref={setNodeRef}
        style={style}
        className={cn(
          "touch-none",
          !disabled && !disableDrag && isDragging && "shadow-sm",
          className
        )}
        {...attributes}
      >
        {showDragHandle && !disabled && !disableDrag && (
          <TableCell
            key={id}
            ref={setActivatorNodeRef}
            className={cn("cursor-move p-2", dragHandleClassName)}
            {...listeners}
          >
            <GripIcon className='block h-4 w-4 text-slate-500 ' />
          </TableCell>
          // <div
          //   ref={setActivatorNodeRef}
          //   className={cn("cursor-move p-2", dragHandleClassName)}
          //   {...listeners}
          // >
          //   <GripIcon className='h-4 w-4 text-slate-500' />
          // </div>
        )}
        {showDragHandle ? (
          children
        ) : (
          <div {...(!disabled && !disableDrag ? listeners : {})}>
            {children}
          </div>
        )}
      </TableRow>
      // </div>
    );
  }
);

SortableTableRow.displayName = "SortableTableRow";

// Main Component
function DraggableWrapper<T extends DraggableItem>({
  items,
  onReorder,
  renderItem,
  containerClassName,
  cardClassName,
  dragHandleClassName,
  styleIcon,
  layout = "grid",
  columns = 3,
  disableDrag = false,
  showDragHandle = false,
  gripType = "default",
  showContainer = true,
  children,
}: DraggableCardsProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  const gridColumnsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  }[columns];

  const containerClasses = cn(
    "w-full",
    layout === "grid"
      ? `grid ${gridColumnsClass} gap-4`
      : "flex flex-wrap gap-4",
    containerClassName
  );

  const SortableContextWrapper = () => (
    <SortableContext
      items={items?.map((item) => item?.id)}
      strategy={rectSortingStrategy}
    >
      <>
        {items?.map((item) =>
          React.Children?.map(children, (child: any, i) => {
            const props = {
              item: item,
              disableDrag: disableDrag,
              showDragHandle: showDragHandle,
              layout: layout,
              cardClassName: cardClassName,
              gripType: gripType,
              dragHandleClassName: dragHandleClassName,
              styleIcon: styleIcon,
              renderItem: renderItem,
            };

            if (React.isValidElement(child)) {
              return React.cloneElement(child, props);
            }
            return null;
          })
        )}
      </>
    </SortableContext>
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {showContainer ? (
        <div className={containerClasses}>
          <SortableContextWrapper />
        </div>
      ) : (
        <SortableContextWrapper />
      )}
    </DndContext>
  );
}

function DraggableCards<T extends DraggableItem>({
  items,
  onReorder,
  renderItem,
  containerClassName,
  cardClassName,
  dragHandleClassName,
  styleIcon,
  layout = "grid",
  columns = 3,
  disableDrag = false,
  showDragHandle = false,
  gripType = "default",
}: DraggableCardsProps<T>) {
  const Child = ({
    item,
    disableDrag,
    showDragHandle,
    layout,
    cardClassName,
    gripType,
    dragHandleClassName,
    styleIcon,
    renderItem,
  }: any) => (
    <SortableCard
      key={item?.id}
      id={item?.id}
      disabled={item?.disabled}
      disableDrag={disableDrag}
      showDragHandle={showDragHandle}
      className={cn(
        layout === "flex" ? "w-full md:w-auto" : "w-full",
        cardClassName
      )}
      gripType={gripType}
      dragHandleClassName={dragHandleClassName}
      styleIcon={styleIcon}
    >
      {renderItem(item)}
    </SortableCard>
  );

  return (
    <DraggableWrapper
      items={items}
      onReorder={onReorder}
      renderItem={renderItem}
      containerClassName={containerClassName}
      cardClassName={cardClassName}
      dragHandleClassName={dragHandleClassName}
      styleIcon={styleIcon}
      layout={layout}
      columns={columns}
      disableDrag={disableDrag}
      showDragHandle={showDragHandle}
      gripType={gripType}
    >
      <Child />
    </DraggableWrapper>
  );
}

function DraggableTableRows<T extends DraggableItem>({
  items,
  onReorder,
  renderItem,
  containerClassName,
  cardClassName,
  dragHandleClassName,
  styleIcon,
  layout = "grid",
  columns = 3,
  disableDrag = false,
  showDragHandle = false,
  gripType = "default",
}: DraggableCardsProps<T>) {
  const Child = ({
    item,
    disableDrag,
    showDragHandle,
    layout,
    cardClassName,
    gripType,
    dragHandleClassName,
    styleIcon,
    renderItem,
  }: any) => (
    <SortableTableRow
      key={item?.id}
      id={item?.id}
      disabled={item?.disabled}
      disableDrag={disableDrag}
      showDragHandle={showDragHandle}
      className={cn(
        layout === "flex" ? "w-full md:w-auto" : "w-full",
        cardClassName
      )}
      gripType={gripType}
      dragHandleClassName={dragHandleClassName}
      styleIcon={styleIcon}
    >
      {renderItem(item)}
    </SortableTableRow>
  );

  return (
    <DraggableWrapper
      items={items}
      onReorder={onReorder}
      renderItem={renderItem}
      containerClassName={containerClassName}
      cardClassName={cardClassName}
      dragHandleClassName={dragHandleClassName}
      styleIcon={styleIcon}
      layout={layout}
      columns={columns}
      disableDrag={disableDrag}
      showDragHandle={showDragHandle}
      showContainer={false}
      gripType={gripType}
    >
      <Child />
    </DraggableWrapper>
  );
}

export { DraggableWrapper, DraggableCards, DraggableTableRows };
export type { DraggableCardsProps, DraggableItem };

/**
 * DraggableCards Component Usage Guide
 *
 * The DraggableCards component is a flexible and customizable drag-and-drop solution for React applications.
 * It allows you to create sortable lists or grids of items with various configuration options.
 *
 * Key Features:
 * - Supports both grid and flex layouts
 * - Responsive design with customizable column counts
 * - Optional drag handle for more controlled dragging
 * - Ability to disable dragging for specific items or all items
 * - Keyboard accessible
 * - Customizable styling for container, cards, and drag handles
 *
 * Props:
 * @param {DraggableItem[]} items - Array of items to be rendered and made draggable
 * @param {function} onReorder - Callback function called when items are reordered
 * @param {function} renderItem - Function to render each item
 * @param {string} [containerClassName] - Additional CSS classes for the container
 * @param {string} [cardClassName] - Additional CSS classes for each card
 * @param {string} [dragHandleClassName] - Additional CSS classes for the drag handle
 * @param {"grid" | "flex"} [layout="grid"] - Layout type (grid or flex)
 * @param {1 | 2 | 3 | 4 | 6} [columns=3] - Number of columns for grid layout
 * @param {boolean} [disableDrag=false] - Disable dragging for all items
 * @param {boolean} [showDragHandle=false] - Show a drag handle instead of making the entire item draggable
 *
 * Usage Examples:
 *
 * 1. Basic grid layout with custom card styling:
 * <DraggableCards
 *   items={yourItems}
 *   onReorder={handleReorder}
 *   renderItem={(item) => <YourItemComponent item={item} />}
 *   cardClassName="bg-white shadow-md hover:shadow-lg transition-shadow"
 * />
 *
 * 2. Flex layout with drag handle and custom styling:
 * <DraggableCards
 *   items={yourItems}
 *   onReorder={handleReorder}
 *   renderItem={(item) => <YourItemComponent item={item} />}
 *   layout="flex"
 *   showDragHandle={true}
 *   cardClassName="border border-slate-200 rounded-lg"
 *   dragHandleClassName="bg-slate-100 hover:bg-slate-200"
 * />
 *
 * 3. Custom grid with disabled drag for some items:
 * <DraggableCards
 *   items={yourItems.map(item => ({ ...item, disabled: item.isLocked }))}
 *   onReorder={handleReorder}
 *   renderItem={(item) => <YourItemComponent item={item} />}
 *   columns={4}
 *   containerClassName="gap-2"
 *   cardClassName="bg-slate-50 hover:bg-slate-100"
 * />
 *
 * Note: Ensure that each item in the `items` array has a unique `id` property.
 * The `disabled` property can be used to prevent specific items from being dragged.
 */
