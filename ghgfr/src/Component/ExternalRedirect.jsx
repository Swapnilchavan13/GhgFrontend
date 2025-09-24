import { useEffect } from "react";

function ExternalRedirect() {
  useEffect(() => {
    window.location.href = "https://nettzero.world/";
  }, []);

  return null; // nothing to render
}

export default ExternalRedirect;
