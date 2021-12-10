// Test Suite de Ejemplo

describe("Example Component", () => {
  test("Debe de ser mayor a 10", () => {
    // ARRANGE (Organizar / Inicializar)
    let value = 9;

    // ACT (Actuar)

    value = value + 2;

    // ASSERT (Confirmar / Comprobar)
    expect(value).toBeGreaterThan(10);
  });
});
