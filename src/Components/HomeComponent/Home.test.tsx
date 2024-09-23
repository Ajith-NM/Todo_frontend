import { it, describe, expect } from "vitest";
import Home from "./Home";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store";
//import * as home from "./Home"

describe("testing Home.tsx", () => {
  it("testing API calls", async () => {
    userEvent.setup();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(await screen.findAllByTestId("todo")).toHaveLength(1);
    const title = screen.getByTestId("title");
    const description = screen.getByTestId("description");
    const submit = screen.getByText("Add Task");
    //task 1
    await userEvent.type(title, "newTask1");
    await userEvent.type(description, "newDescription1");
    await userEvent.click(submit);
    expect(await screen.findAllByTestId("todo")).toHaveLength(2);
    expect(screen.getByText("Test Title 2"));

    //task 2
    await userEvent.clear(title);
    await userEvent.clear(description);
    await userEvent.type(title, "newTask2");
    await userEvent.type(description, "newDescription2");
    await userEvent.click(submit);
    expect(await screen.findAllByTestId("todo")).toHaveLength(3);
    expect(screen.getByText("Test Title 3"));

  });
});
