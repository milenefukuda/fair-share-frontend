import { HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import img from "../../images/cover.jpg";

export function Home() {
  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen pt-16"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dukhlscyh/image/upload/v1678420261/pictures/file_yzmw9g.png")`,
        }}
      >
        <div className="flex flex-col items-start justify-end h-96 pl-48">
          <div className="flex justify-start gap-4">
            <Link to="/discover">
              <button className="btn-indigo mr-2">Save Food</button>
            </Link>
            <Link to="/signup">
              <button className="btn-indigo mr-2">Sign up</button>
            </Link>
            <Link to="/login">
              <button className="btn-indigo">Log in</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
