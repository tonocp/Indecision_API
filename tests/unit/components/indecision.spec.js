import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";

describe("Indecision Component", () => {
  // INICIALIZO EL DOM PARA CADA TEST UNITARIO
  let wrapper;
  let consLogSpy;

  beforeEach(() => {
    wrapper = shallowMount(Indecision);

    consLogSpy = jest.spyOn(console, "log");

    // Limpiamos todos los Mocks
    jest.clearAllMocks();
  });

  // MOCK COMPLETO DEL FETCH DEL YESNO.WTF/API
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: "yes",
          forced: false,
          image: "https://yesno.wtf/assets/yes/2.gif",
        }),
    })
  );

  // TESTS UNITARIOS

  test("Debe hacer match con el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Escribir en el input no debe de disparar nada (console.log())", async () => {
    // wrapper.vm es la instacia propia de Vue
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const input = wrapper.find("input");

    // Cuando se modifica el DOM hay que esperar a que se vuelva a renderizar y hacer el callback de manera asíncrona
    await input.setValue("Hola Mundo");

    expect(consLogSpy).toHaveBeenCalled();
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test("Escribir el símbolo '?' debe disparar el getAnswer()", async () => {
    // wrapper.vm es la instacia propia de Vue
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const input = wrapper.find("input");

    // Cuando se modifica el DOM hay que esperar a que se vuelva a renderizar y hacer el callback de manera asíncrona
    await input.setValue("Hola Mundo?");

    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test("Pruebas en getAnswer()", async () => {
    // Cuando se modifica el DOM hay que esperar a que se vuelva a renderizar y hacer el callback de manera asíncrona
    await wrapper.vm.getAnswer();
    const img = wrapper.find("img");

    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.img).toBe("https://yesno.wtf/assets/yes/2.gif");
    expect(wrapper.vm.answer).toBe("Sip!");
  });

  test("Pruebas en getAnswer() - Fallo en el API", async () => {
    // Genero el error simulado del API
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));

    await wrapper.vm.getAnswer();

    const img = wrapper.find("img");

    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe("No se pudo cargar del API");
  });
});
