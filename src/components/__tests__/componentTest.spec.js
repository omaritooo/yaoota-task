import { test, expect, beforeEach, describe } from "vitest";
import { mount } from "@vue/test-utils";
import App from "../../App.vue";
import { setActivePinia, createPinia, storeToRefs } from "pinia";
import BaseInput from "../Base/BaseInput.vue";
import { useindexStore } from "../../stores";

describe("BaseInput Test", () => {
  test("Base Input", () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: "text-field",
        modelValue: "Test Value",
        "onUpdate:modelValue": (e) => wrapper.setProps({ modelValue: e }),
      },
    });
    expect(wrapper.props("modelValue")).toBe("Test Value");
  });
});

describe("Store tests", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("Mobile Toggle", async () => {
    const store = useindexStore();
    const { setWidth } = store;
    const { width, isMobile } = storeToRefs(store);
    width.value = 200;
    setWidth();
    expect(isMobile.value).toBe(true);
  });
  test("Window Resize", async () => {
    const store = useindexStore();
    const { setWidth } = store;
    const { width, isMobile } = storeToRefs(store);
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));
    width.value = global.innerWidth;
    setWidth();
    expect(isMobile.value).toBe(true);
  });
});
