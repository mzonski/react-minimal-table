module.exports = {
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
    "import/no-extraneous-dependencies": "off",
  },
  // overrides: [
  //   {
  //     files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
  //     extends: ["plugin:storybook/recommended"],
  //     rules: {
  //       // 'storybook/hierarchy-separator': 'error',
  //       // 'storybook/default-exports': 'off',
  //     }
  //   }
  // ]
};
