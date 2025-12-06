// Mock hljs for ngx-highlight-js in tests
(window as any).hljs = {
  highlightAll: () => {},
  highlightElement: () => {},
  configure: () => {},
  listLanguages: () => [],
  getLanguage: () => ({}),
  highlight: () => ({ value: '' }),
};
