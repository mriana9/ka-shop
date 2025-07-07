import { Button, CircularProgress } from "@mui/material";

export default function CustomButton({
  isLoading,
  text,
  loadingText = "Loading...",
  ...props
}) {
  return (
    <Button
      variant="outlined"
      className="btn-secondary"
      type="submit"
      fullWidth
      disabled={isLoading}
      sx={{
        margin: "20px 0px",
        textTransform: "capitalize",
        padding: "12px 24px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: 600,
        borderColor: "#b9004b",
        color: "#b9004b",
        backgroundColor: "#fff",
        "&:hover": {
          backgroundColor: "#b9004b",
          color: "#fff",
        },
        "&:disabled": {
          opacity: 0.6,
          cursor: "not-allowed",
        },
      }}
      {...props}
    >
      {isLoading ? (
        <>
          <CircularProgress size={16} sx={{ mr: 1 }} />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
}
