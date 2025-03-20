import { Button } from "@mui/material";
import { IconAlertCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
        <IconAlertCircle className="text-red-500" size={64} />
        <h1 className="text-4xl font-bold mt-4 text-gray-800">404</h1>
        <p className="text-gray-600 mt-2">
          Oops! The page you are looking for does not exist.
        </p>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          className="mt-4"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
