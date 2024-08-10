import React from "react";
import { Stack, Typography } from "@mui/material";

const PageTitle = React.memo(({ title = "", crumbs = [], extraComp, helpertext = "" }) => {
  return (
    <>
      <Stack>
        {title && (
          <>
            <Typography variant="h6" sx={{ fontSize: "24px" }} gutterBottom>
              {title}
              {extraComp}
              {helpertext && (
                <Typography sx={{ fontSize: "10px", color: "#616161" }}>{helpertext}</Typography>
              )}
            </Typography>
          </>
        )}
      </Stack>
    </>
  );
});

export default PageTitle;
