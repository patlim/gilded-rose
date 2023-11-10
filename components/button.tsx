export default function Button ({
  type,
  label,
  clickHandler,
}: {
  type: "primary" | "secondary",
  label: string,
  clickHandler: Function,
}) {
  return (
    <button
      className={`--${type}`}
      onClick={() => clickHandler}
    >
      {label}
    </button>
  )
}
