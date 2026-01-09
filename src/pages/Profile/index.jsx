import { useSelector } from "react-redux";

import AccountBalance from "../../components/AccountBalance";
import accounts from "../../accounts-placeholder-data";

export default function Profile() {
  const userFirstName = useSelector((state) => state.user.infos?.firstName);
  const userLastName = useSelector((state) => state.user.infos?.lastName);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userFirstName} {userLastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <>
        {accounts.map((account) => {
          return (
            <AccountBalance
              title={account.title}
              key={account.title}
              balance={account.balance}
            />
          );
        })}
      </>
    </main>
  );
}
