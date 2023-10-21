import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import Home from "./Home";

describe("Home", () => {
  test("Display home", async () => {
    // ARRANGE
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    screen.debug();

    //ASSERT
    expect(screen.getByText("presentacion")).toBeDefined();
    expect(screen.getByText("presentacion2")).toBeDefined();
    expect(screen.getAllByRole("button").length).toBe(2);
  });
});
