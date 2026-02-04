import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateUser } from "../../slices/userSlice";

import AccountBalance from "../../components/AccountBalance";
import { fetchAccounts } from "../../slices/accountsSlice";

export default function Profile() {
  const dispatch = useDispatch();

  const userFirstName = useSelector((state) => state.user.infos?.firstName);
  const userLastName = useSelector((state) => state.user.infos?.lastName);
  const userToken = useSelector((state) => state.auth.userToken);

  const [isInEditMode, setIsInEditMode] = useState(false);

  const accounts = useSelector((state) => state.accounts.data);

  useEffect(() => {
    if (!accounts) {
      dispatch(fetchAccounts());
    }
  }, [dispatch, accounts]);

  let header = "";

  function submitEditForm(formData) {
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    };
    dispatch(updateUser({ data, token: userToken }));
    setIsInEditMode(false);
  }

  if (!isInEditMode) {
    header = (
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userFirstName} {userLastName}!
        </h1>
        <button className="edit-button" onClick={() => setIsInEditMode(true)}>
          Edit Name
        </button>
      </div>
    );
  } else {
    header = (
      <div className="header">
        <h1>Welcome back</h1>
        <form action={submitEditForm} className="edit-infos-form">
          <input type="text" name="firstName" required placeholder={userFirstName} />
          <input type="text" name="lastName" required placeholder={userLastName} />

          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsInEditMode(false)}>
            Cancel
          </button>
        </form>
      </div>
    );
  }

  return (
    <main className="main bg-dark">
      {header}
      <h2 className="sr-only">Accounts</h2>
      {accounts && (
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
      )}
    </main>
  );
}
