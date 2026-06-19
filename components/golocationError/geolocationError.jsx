/** @format */

export default function GeolocationError({message}) {
  return (
    <div
      style={{
        color: "var(--primary-600)",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "1rem auto",
      }}
    >
      <p>{message}</p>
    </div>
  );
}
