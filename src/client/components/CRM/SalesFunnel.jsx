import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function SalesFunnel({ funnel, customers }) {
  const onDragEnd = (result) => {
    // Implement drag and drop logic here
    // This will involve updating the customer's stage in the backend
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {funnel.stages.map((stage, index) => (
          <Droppable key={stage.id} droppableId={stage.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ width: '18%', border: '1px solid black', padding: '10px' }}
              >
                <h3>{stage.name}</h3>
                {customers
                  .filter(customer => customer.stage === stage.id)
                  .map((customer, index) => (
                    <Draggable key={customer.id} draggableId={customer.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ 
                            userSelect: 'none',
                            padding: '16px',
                            margin: '0 0 8px 0',
                            backgroundColor: 'white',
                            ...provided.draggableProps.style
                          }}
                        >
                          {customer.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default SalesFunnel;