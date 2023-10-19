import { useEffect, useState } from "react";
import { ArrowRight, ErrorMessage } from "./styles";

function AlertTooltip(): JSX.Element {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMouseMove(event: MouseEvent): void {
      setPosition({
        x: event.clientX - 23,
        y: event.clientY + 20,
      });

      window.removeEventListener("mousemove", handleMouseMove);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (position.x === 0) return <></>;
  return (
    <ErrorMessage position={position}>
      <ArrowRight />
      <p className="error-title">Inválido:</p>
      <p>
        A entrada não é aceitável, pois não
        <br />
        corresponde a nenhum dos itens da
        <br />
        coluna especificada.
      </p>
    </ErrorMessage>
  );
}

export default AlertTooltip;
