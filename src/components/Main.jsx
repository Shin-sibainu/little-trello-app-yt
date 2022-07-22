import React, { useState } from "react";
import "./Main.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import dummyData from "../dummyData";
import Card from "./card/Card";

const Main = () => {
  const [data, setData] = useState(dummyData);

  const onDragEnd = (result) => {
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="trello">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                className="trello-section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="trello-section-title">{section.title}</div>
                <div className="trello-section-content">
                  {section.tasks.map((task, index) => (
                    // <Card key={task.id}>{task.title}</Card>
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Main;
