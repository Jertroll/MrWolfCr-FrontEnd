import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditarProductoModal from '../components/productos/paginas modal/EditarProductoModal';
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe('EditarProductoModal - Modificar Producto', () => {
    // Datos de prueba para el producto
    const productoForm = {
      codigo: 'ABC123',
      nombre: 'Producto de prueba',
      precio: 100,
      descripcion: 'Descripción de prueba',
      tallas: [
        { id: 1, nombre: 'XS' },
        { id: 2, nombre: 'S' },
      ],
      estado: 'Disponible',
      genero_dirigido: 'Masculino',
      id_categoria: 1,
    };
  
    // Mock de las funciones requeridas
    const onRequestClose = vi.fn();
    const handleInputChange = vi.fn();
    const saveChanges = vi.fn();
  
    beforeEach(() => {
      // Renderizar el modal con los datos de prueba
      render(
        <EditarProductoModal
          isOpen={true}
          onRequestClose={onRequestClose}
          productoForm={productoForm}
          handleInputChange={handleInputChange}
          saveChanges={saveChanges}
        />
      );
    });
  
    it('debe abrir el modal y cargar los datos del producto', () => {
      // Verificar que el modal está abierto
      expect(screen.getByText('Editor de Producto')).toBeInTheDocument();
  
      // Verificar que los campos están llenos con los datos del producto
      expect(screen.getByLabelText('Código de Producto')).toHaveValue('ABC123');
      expect(screen.getByLabelText('Nombre')).toHaveValue('Producto de prueba');
      expect(screen.getByLabelText('Precio')).toHaveValue(100);
      expect(screen.getByLabelText('Descripción')).toHaveValue('Descripción de prueba');
      expect(screen.getByLabelText('Estado')).toHaveValue('Disponible');
      expect(screen.getByLabelText('Género Dirigido')).toHaveValue('Masculino');
      expect(screen.getByLabelText('Categoría')).toHaveValue(1);
    });
  
    it('debe modificar los datos del producto y enviarlos correctamente', async () => {
      // Simular cambios en los campos del formulario
      fireEvent.change(screen.getByLabelText('Código de Producto'), {
        target: { value: 'XYZ789' },
      });
      fireEvent.change(screen.getByLabelText('Nombre'), {
        target: { value: 'Producto actualizado' },
      });
      fireEvent.change(screen.getByLabelText('Precio'), {
        target: { value: '150' },
      });
      fireEvent.change(screen.getByLabelText('Descripción'), {
        target: { value: 'Nueva descripción' },
      });
      fireEvent.change(screen.getByLabelText('Estado'), {
        target: { value: 'No disponible' },
      });
      fireEvent.change(screen.getByLabelText('Género Dirigido'), {
        target: { value: 'Femenino' },
      });
      fireEvent.change(screen.getByLabelText('Categoría'), {
        target: { value: '2' },
      });
  
      // Simular la selección de tallas
      const tallasInput = screen.getByLabelText('Tallas');
      fireEvent.change(tallasInput, {
        target: { value: 'M' }, // Ajusta según tu implementación
      });
  
      // Simular la carga de una imagen
      const fileInput = screen.getByLabelText('Imagen');
      const file = new File(['(⌐□_□)'], 'producto.png', { type: 'image/png' });
      fireEvent.change(fileInput, { target: { files: [file] } });
  
      // Simular el envío del formulario
      fireEvent.click(screen.getByText('Guardar'));
  
      // Verificar que la función saveChanges se llama con los datos correctos
      await waitFor(() => {
        expect(saveChanges).toHaveBeenCalledWith(
          expect.any(Object), // Evento del formulario
          [1, 2], // IDs de las tallas seleccionadas
          [file] // Archivos seleccionados
        );
      });
  
      // Verificar que los datos modificados se enviaron correctamente
      expect(saveChanges).toHaveBeenCalledWith(
        expect.any(Object), // Evento del formulario
        [1, 2], // IDs de las tallas seleccionadas
        [file] // Archivos seleccionados
      );
    });
  });