import "./App.css";
import AddContact from "./Component/AddContact";
import ContactList from "./Component/ContactList";

import Header from "./Component/Header";

function App() {
  return (
    <>
      <Header />
      <AddContact />
      {/* <MainContainer /> */}
      <ContactList />

      {/* <AddContact />
      <ContactList /> */}
    </>
  );
}

export default App;
