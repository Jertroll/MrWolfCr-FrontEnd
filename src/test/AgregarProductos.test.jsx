import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import AgregarProductos from "../components/productos/AgregarProductos";
import "@testing-library/jest-dom";
import { BASE_URL } from "../components/utils/auth";

describe("AgregarProductos - Registrar Producto", () => {
  beforeEach(() => {
    // Mockear fetch para simular una respuesta exitosa
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ message: "Producto registrado exitosamente" }),
          text: () => Promise.resolve("Producto registrado exitosamente"), // Añadir método text
        })
      )
    );
  });

  afterEach(() => {
    // Limpiar mocks después de cada prueba
    vi.unstubAllGlobals();
  });

  it("debe registrar un producto correctamente y mostrar un mensaje de éxito", async () => {
    // 1. Renderizar el componente
    render(
      <MemoryRouter>
        <AgregarProductos />
      </MemoryRouter>
    );

    // 2. Simular la entrada de datos en el formulario
    fireEvent.change(screen.getByLabelText(/Código/i), {
      target: { value: "ABC123" },
    });
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Producto de prueba" },
    });
    fireEvent.change(screen.getByLabelText(/Precio/i), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: "Una descripción de prueba" },
    });

    // 3. Simular la selección de tallas
    const tallasInput = screen.getByLabelText(/Tallas/i);
    fireEvent.change(tallasInput, {
      target: { value: "M" }, // Ajusta según tu implementación
    });

    // 4. Simular la selección de estado
    fireEvent.change(screen.getByLabelText(/Estado/i), {
      target: { value: "Disponible" },
    });

    // 5. Simular la selección de género dirigido
    fireEvent.change(screen.getByLabelText(/Género Dirigido/i), {
      target: { value: "Masculino" },
    });

    // 6. Simular la entrada de ID Categoría
    fireEvent.change(screen.getByLabelText(/ID Categoría/i), {
      target: { value: "1" },
    });

    // 7. Simular la carga de una imagen
    const fileInput = screen.getByLabelText(/Imágenes del Producto/i);
    const file = new File(["(⌐□_□)"], "producto.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // 8. Simular el envío del formulario
    fireEvent.click(
      screen.getByRole("button", { name: /Registrar Producto/i })
    );

    // 9. Verificar que se realizó la solicitud HTTP correctamente
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v1/productos`,
        {
          method: "POST",
          body: expect.any(FormData), // Verifica que se envió un FormData
        }
      );
    });

    // 10. Verificar que se muestra el mensaje de éxito
    expect(
      await screen.findByText(/Producto registrado exitosamente/i)
    ).toBeInTheDocument();
  });

  it("debe mostrar un mensaje de error si la solicitud falla", async () => {
    // Mockear fetch para simular una respuesta de error
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          json: () =>
            Promise.resolve({ message: "Error al registrar el producto" }),
          text: () => Promise.resolve("Error al registrar el producto"), // Añadir método text
        })
      )
    );

    // Renderizar el componente
    render(
      <MemoryRouter>
        <AgregarProductos />
      </MemoryRouter>
    );

    // Simular la entrada de datos en el formulario
    fireEvent.change(screen.getByLabelText(/Código/i), {
      target: { value: "DEF456" },
    });
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Producto fallido" },
    });
    fireEvent.change(screen.getByLabelText(/Precio/i), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: "Descripción fallida" },
    });

    // Simular la selección de tallas
    const tallasInput = screen.getByLabelText(/Tallas/i);
    fireEvent.change(tallasInput, {
      target: { value: "L" },
    });

    // Simular la selección de estado
    fireEvent.change(screen.getByLabelText(/Estado/i), {
      target: { value: "No disponible" },
    });

    // Simular la selección de género dirigido
    fireEvent.change(screen.getByLabelText(/Género Dirigido/i), {
      target: { value: "Femenino" },
    });

    // Simular la entrada de ID Categoría
    fireEvent.change(screen.getByLabelText(/ID Categoría/i), {
      target: { value: "2" },
    });

    // Simular la carga de una imagen
    const fileInput = screen.getByLabelText(/Imágenes del Producto/i);
    const file = new File(["(⌐□_□)"], "producto.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Simular el envío del formulario
    fireEvent.click(
      screen.getByRole("button", { name: /Registrar Producto/i })
    );

    // Verificar que se muestra el mensaje de error
    expect(
      await screen.findByText(/Error al registrar el producto/i)
    ).toBeInTheDocument();
  });
});
