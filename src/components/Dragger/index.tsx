/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Tree } from "antd";
import { IDraggerProps } from "./Dragger.d";
import { Container } from "./styles";
import { ReactComponent as MenuIcon } from "../../assets/menu-small-gray.svg";

// eslint-disable-next-line import/prefer-default-export
export const Dragger: React.FC<IDraggerProps> = ({
  options,
  handleOnDrop = () => {},
}) => {
  const [treeData, setTreeData] = useState<any[]>(options);

  const handleOnDropC = (info: any) => {
    const { dropToGap, node, dragNode } = info;

    const newTreeData = [...treeData];
    const dragNodeIndex = newTreeData.findIndex(
      (n: any) => n.key === dragNode.key,
    );
    newTreeData.splice(dragNodeIndex, 1);
    const targetIndex = node
      ? newTreeData.findIndex((n: any) => n.key === node.key)
      : 0;
    const dropPosition = info.dropPosition - Number(info.dropToGap);
    const newIndex = dropPosition === -1 ? targetIndex : targetIndex + 1;
    const { title, key } = dragNode;
    const newNode = { title, key };
    newTreeData.splice(newIndex, 0, newNode);
    setTreeData(newTreeData);
  };

  useEffect(() => {}, [options]);

  return (
    <Container>
      <Tree
        className="draggable-tree"
        treeData={options}
        showLine
        // draggable
        icon={() => {
          return <MenuIcon className="custom-drag-icon" />;
        }}
        onDrop={(e) => {
          handleOnDrop(e);
        }}
      />
    </Container>
  );
};
