import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe("Counter Component", () => {
  test("Debe hacer match con el snapshot", () => {
    // ARRANGE

    const wrapper = shallowMount(Counter);

    // ASSERT
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("h2 debe tener el valor por defecto 'Counter' ", () => {
    // ARRANGE
    const wrapper = shallowMount(Counter);

    expect(wrapper.find("h2").exists()).toBeTruthy();

    const h2Value = wrapper.find("h2").text();

    // ASSERT
    expect(h2Value).toBe("Counter");
  });

  test('El valor por defecto debe ser 100 en "p"', () => {
    // ARRANGE
    const wrapper = shallowMount(Counter);

    const value = wrapper.find('[data-testId="counter"]').text();

    // ASSERT
    expect(value).toBe("100");
  });
});
