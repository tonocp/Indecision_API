import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe("Counter Component", () => {
  // INICIALIZO EL DOM PARA CADA TEST UNITARIO
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  // TESTS UNITARIOS

  test("Debe hacer match con el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("h2 debe tener el valor por defecto 'Counter' ", () => {
    expect(wrapper.find("h2").exists()).toBeTruthy();

    const h2Value = wrapper.find("h2").text();

    expect(h2Value).toBe("Counter");
  });

  test('El valor por defecto debe ser 100 en "p"', () => {
    const value = wrapper.find('[data-testId="counter"]').text();

    expect(value).toBe("100");
  });

  test("Debe incrementar y decrementar el contador", async () => {
    const [increaseBtn, decreaseBtn] = wrapper.findAll("button");

    // Cuando se modifica el DOM hay que esperar a que se vuelva a renderizar y hacer el callback de manera asíncrona
    await increaseBtn.trigger("click");
    await increaseBtn.trigger("click");
    await increaseBtn.trigger("click");
    await decreaseBtn.trigger("click");
    await decreaseBtn.trigger("click");

    const value = wrapper.find('[data-testId="counter"]').text();

    expect(value).toBe("101");
  });

  test("Debe de establecer el valor por defecto", () => {
    const { start } = wrapper.props();

    const value = wrapper.find('[data-testId="counter"]').text();

    expect(Number(value)).toBe(start);
  });

  test("Debe de mostrar la prop title", () => {
    const title = "Hola Test!";
    const wrapper = shallowMount(Counter, {
      props: {
        title,
      },
    });

    expect(wrapper.find("h2").text()).toBe(title);
  });
});
