import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../store";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

export function renderWithWrapper(ui, options = {}) {
  const { preloadedState = {}, route = "/" } = options;
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  );
}
