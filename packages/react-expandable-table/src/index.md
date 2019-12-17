```js
import { Text } from '@quid/react-core';
import { ExpandableTable } from '.';

const columns = [
  {
    label: 'Name',
    key: 'name',
    width: 30,
    tooltip: (
      <Text
        style={{ maxWidth: '100px', display: 'block', whiteSpace: 'normal' }}
      >
        Any reference to real facts or persons is purely coincidental
      </Text>
    ),
  },
  {
    label: 'Rank',
    key: 'rank',
    bold: true,
    align: 'right',
  },
  {
    label: 'Mentions',
    key: 'mentions',
    align: 'right',
  },
  {
    label: 'KOL Score',
    key: 'kol_score',
    tooltip: 'Key Opinion Leaders Score',
    align: 'right',
  },
  {
    label: 'Reach',
    key: 'reach',
    align: 'right',
  },
  {
    label: 'Score',
    key: 'score',
    align: 'right',
  },
];

initialState = {
  openedRows: ['1', '3'],
  page: 1,
  data: [
    {
      id: '1',
      name: 'Iron Man',
      rank: '1',
      mentions: '9',
      kol_score: '93.70%',
      reach: '93.60%',
      score: 70,
    },
    {
      id: '2',
      name: 'Captain America',
      rank: '2',
      mentions: '38',
      kol_score: '99.70%',
      reach: '99.45%',
      score: 50,
    },
    {
      id: '3',
      name: 'Thor',
      rank: '3',
      mentions: '46',
      kol_score: '100.00%',
      reach: '100.00%',
      score: 600,
    },
    {
      id: '4',
      name: 'Black Widow',
      rank: '4',
      mentions: '17',
      kol_score: '0.00%',
      reach: '0.00%',
      score: 800,
    },
    {
      id: '5',
      name: {
        raw: 'Hulk',
        content: <span style={{ color: 'gray' }}>Hulk</span>,
      },
      rank: '5',
      mentions: '35',
      kol_score: '99.10%',
      reach: '99.10%',
      score: 10,
    },
    {
      id: '6',
      name: 'Hawkeye',
      rank: '6',
      mentions: '34',
      kol_score: '0.00%',
      reach: '0.00%',
      score: 5,
    },
    {
      id: '7',
      name: 'Mockingbird',
      rank: '7',
      mentions: '16',
      kol_score: '97.10%',
      reach: '97.10%',
      score: 15,
    },
    {
      id: '8',
      name: 'War Machine',
      rank: '8',
      mentions: '21',
      kol_score: '0.00%',
      reach: '0.00%',
      score: 960,
    },
    {
      id: '9',
      name: 'Ant-Man',
      rank: '9',
      mentions: '10',
      kol_score: '94.70%',
      reach: '94.70%',
      score: 330,
    },
    {
      id: '10',
      name: 'Vision',
      rank: '10',
      mentions: '18',
      kol_score: '94.70%',
      reach: '94.70%',
      score: 70,
    },
    {
      id: '11',
      name: 'Quicksilver',
      rank: '11',
      mentions: '18',
      kol_score: '94.70%',
      reach: '94.70%',
      score: 63,
    },
    {
      id: '12',
      name: 'Scarlet Witch',
      rank: '12',
      mentions: '18',
      kol_score: '94.70%',
      reach: '94.70%',
      score: 77,
    },
  ],
};

const Content = ({ style = { height: 100, padding: 10 } }) => (
  <div style={style}>Some expanded content will be displayed here.</div>
);

<div id="virtual">
  <button
    type="button"
    onClick={() => setState({ page: Math.max(state.page - 1, 1) })}
  >
    Previous page
  </button>
  <button
    type="button"
    onClick={() =>
      setState({
        page: Math.min(state.page + 1, Math.ceil(state.data.length / 10)),
      })
    }
  >
    Next page
  </button>

  <ExpandableTable
    onToggle={openedRows => setState({ openedRows })}
    maxOpen={3}
    maxItemPerPage={10}
    page={state.page}
    openedRows={state.openedRows}
    maxBodyHeight={300}
    renderRow={props => <Content />}
    columns={columns}
    data={state.data}
  />
</div>;
```
