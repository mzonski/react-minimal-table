const path = require("path");

const config = {
  root: true,
  plugins: ["zonia"],
  extends: ["plugin:zonia/react"],
  parserOptions: {
    project: "tsconfig.json",
  },
  rules: {
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    // TODO: weź to w końcu ogarnij
    // "import/no-extraneous-dependencies": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: [path.resolve(__dirname, "tsconfig.json")],
        alwaysTryTypes: true,
      },
      node: {
        extensions: [".ts", ".tsx"],
        paths: [path.resolve(__dirname, "src")],
      },
    },
  },
  overrides: [
    {
      files: ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
      extends: ["plugin:storybook/recommended"],
      rules: {
        "import/no-extraneous-dependencies": "off",
        // 'storybook/hierarchy-separator': 'error',
        // 'storybook/default-exports': 'off',
      },
    },
  ],
};

module.exports = config;
