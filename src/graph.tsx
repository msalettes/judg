/* eslint-disable react-hooks/exhaustive-deps */
import dagre from 'dagre';
import React, { useCallback, useState } from 'react';
import ReactFlow, { addEdge, ConnectionLineType, isNode, ReactFlowProvider, removeElements } from 'react-flow-renderer';
// https://reactflow.dev/examples/layouting/
import { elements as initialElements } from './flow-elements';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (elements: any, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el: any) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el: any) => {
    const convertedElement: any = el;
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      convertedElement.targetPosition = isHorizontal ? 'left' : 'top';
      convertedElement.sourcePosition = isHorizontal ? 'right' : 'bottom';

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      convertedElement.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return convertedElement;
  });
};

const layoutedElements = getLayoutedElements(initialElements);

const LayoutFlow = () => {
  const [elements, setElements] = useState(layoutedElements);
  const onConnect = (params: any) =>
    setElements((els: any) => addEdge({ ...params, type: 'smoothstep', animated: true }, els));
  const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));

  const onLayout = useCallback(
    (direction) => {
      const layoutedElements = getLayoutedElements(elements, direction);
      setElements(layoutedElements);
    },
    [elements],
  );

  return (
    <div className="layoutflow">
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          connectionLineType={ConnectionLineType.SmoothStep}
        />
        <div className="controls">
          <button onClick={() => onLayout('TB')}>vertical layout</button>
          <button onClick={() => onLayout('LR')}>horizontal layout</button>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default LayoutFlow;
