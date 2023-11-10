import { MouseEventHandler } from "react";

export default function Button ({
  className,
  type,
  label,
  clickHandler,
}: {
  className?: string;
  type: "primary" | "secondary" | "tertiary",
  label: string,
  clickHandler: MouseEventHandler<HTMLButtonElement>,
}) {
  return (
    <button
      className={`--${type}${className ? ` ${className}` : ''}`}
      onClick={clickHandler}
    >
      {label}
    </button>
  )
}
