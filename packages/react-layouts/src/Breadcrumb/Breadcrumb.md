Breadcrumb example:
It allows users to keep track and maintain awareness of their locations within your website.

```js
const { MemoryRouter } = require('react-router-dom');
const items = [
  {
    label: 'Project Name 13',
    path: '/',
    arrowIcon: 'angle_double_right',
    emphasized: true,
  },
  {
    label: 'SEARCH',
    path: '/search',
    tooltip: 'project AND name',
  },
  {
    label: 'EXPLORE',
    path: '/search/explore',
  },
  {
    label: 'ANALYZE',
    path: '/Breadcrumb',
    disabled: true,
  },
  {
    label: 'PRESENT',
    path: '/search/explore/analyze/present',
    disabled: true,
  },
  {
    label: 'EXTERNAL',
    path: 'https://quid.com',
    external: true,
  },
  {
    label: 'Quid custom',
    path: 'https://quid.com',
    external: true,
    renderContent: ({ label, path, index, external }) => (
      <div>
        <a href={path}>
          {label} {index}
        </a>
      </div>
    ),
  },
];

<MemoryRouter>
  <Breadcrumb items={items} />
</MemoryRouter>;
```
