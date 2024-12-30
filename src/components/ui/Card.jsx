export function Card({ children, completed }) {
  return (
    <div className={`bg-red-800 max-w-md w-full p-10 rounded-md ${completed && "bg-green-800"}`}>
      {children}
    </div>
  );
}

