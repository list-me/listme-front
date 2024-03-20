import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ErrorMessage } from "./styles";

function AlertTooltip({
  setAlertTooltip,
  children,
}: {
  setAlertTooltip: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}): JSX.Element {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const hasDropdownAncestor = useCallback(
    (element: HTMLElement | null): boolean => {
      if (!element) {
        return false;
      }

      if (element.classList.contains("hover-container-info")) {
        return true;
      }

      return hasDropdownAncestor(element.parentElement);
    },
    [],
  );

  useEffect(() => {
    function handleMouseClick(event: MouseEvent): void {
      setPosition({
        x: event.clientX - 23,
        y: event.clientY + 20,
      });

      window.removeEventListener("click", handleMouseClick);
    }
    function handleMouseMove(event: MouseEvent): void {
      const targetElement = event.target as HTMLElement;

      if (!hasDropdownAncestor(targetElement)) {
        setAlertTooltip(false);
      }
    }

    window.addEventListener("click", handleMouseClick);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hasDropdownAncestor, setAlertTooltip]);

  if (position.x === 0) return <></>;
  return (
    <ErrorMessage position={position}>
      <ArrowRight />
      {children}
    </ErrorMessage>
  );
}

export default AlertTooltip;
