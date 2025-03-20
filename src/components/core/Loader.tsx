import { Box, CircularProgress } from "@mui/material";

interface LoaderProps {
  loading?: boolean;
}

const Loader = ({ loading = true }: LoaderProps) => {
  if (loading)
    return (
      <Box
        display="inline-block"
        className="w-full h-full fixed pointer-events-auto z-[100]"
      >
        <div className="w-full h-full bg-black opacity-70"></div>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  return null;
};

export default Loader;
