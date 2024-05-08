import React from "react";
import Root from "./src";
import ThemeContextProvider from "./src/context/ThemeContext";
import AuthContextProvider from "./src/context/AuthContex";
import NoInternet from "./src/components/NoInternet/NoInternet";

function App() {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <NoInternet />
        <Root />
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
