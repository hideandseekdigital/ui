import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (cfg) => {
    cfg.plugins = cfg.plugins ?? [];
    cfg.plugins.push(tailwindcss());

    // Add path alias resolution for @/*
    cfg.resolve = cfg.resolve ?? {};
    cfg.resolve.alias = cfg.resolve.alias ?? {};
    cfg.resolve.alias["@"] = path.resolve(__dirname, "../src");

    return cfg;
  },
};

export default config;
