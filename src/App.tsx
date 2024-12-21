import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div
      className={
        "container mx-auto flex min-h-screen w-full flex-col items-center justify-center"
      }
    >
      <Outlet />
    </div>
  );
}

export default App;
