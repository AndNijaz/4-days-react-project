import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import BalanceRow from "../BalanceRow/BalanceRow";
import Movements from "../Movements/Movements";
import Summary from "../Summary/Summary";
import Main from "../Main/Main";
import { query, where, onSnapshot } from "firebase/firestore";
import { colRef } from "../../firebase";

const u = {
  name: "Nijaz Andelic",
  movements: [
    { value: -10, date: "2024-03-05T18:00:00-05:00" },
    { value: 30, date: "2024-02-20T15:45:30+03:00" },
    { value: 10, date: "2024-01-13T08:30:00Z" },
    { value: 20, date: "2024-01-13T08:30:00Z" },
  ],
  interestRate: 1.2,
  pin: 1111,
};

export default function Dashboard({ error, setError }) {
  const [user, setUser] = useState(u);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      navigate("/login");
      await logout();
      // navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    const q = query(colRef, where("email", "==", currentUser.email));
    //console.log(q);
    onSnapshot(q, (snapshot) => {
      //let arr = [];
      snapshot.docs.forEach((doc) => {
        setUser({ ...doc.data() });
      });
      //console.log(arr);
    });
  }, []);

  return (
    <Main user={user} onLogout={handleLogout} setError={setError}>
      <BalanceRow movements={user.movements} />
      <Movements movements={user.movements} />
      <Summary movements={user.movements} />
    </Main>
  );
}
