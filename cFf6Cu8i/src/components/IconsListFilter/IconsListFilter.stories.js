import { IconsListFilter } from ".";

export default {
  title: "Components/IconsListFilter",
  component: IconsListFilter,
  argTypes: {
    outline: {
      options: ["off", "on"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    outline: "off",
    className: {},
    unionClassName: {},
    union: "https://c.animaapp.com/cFf6Cu8i/img/union.svg",
  },
};
