import {
  render,
  screen,
  getByRole,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "../../providers/AuthContext";
import { DentistContext } from "../../contexts/DentistContext";

import Card from "./Card";

describe("<Card />", () => {
  test("Teste para verificar se o Card está sendo renderizado corretamente", async () => {

    render(
      <BrowserRouter>
        <AuthProvider>
          <DentistContext>
            <Card />
          </DentistContext>
        </AuthProvider>
      </BrowserRouter>
    );

    const dentista = screen.getByRole("heading", { level: 2 });
    expect(dentista.map).toBe(undefined);
  });
});
