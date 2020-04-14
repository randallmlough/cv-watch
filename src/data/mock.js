import { datasetColorGenerator } from '../util/styles';

export const mockData = {
  options: { label: '# of votes' },
  data: [
    {
      label: 'First',
      data: 12,
      ...datasetColorGenerator('red'),
    },
    {
      label: 'Second',
      data: 35,
      ...datasetColorGenerator('blue'),
    },
    {
      label: 'Third',
      data: 3,
      ...datasetColorGenerator('yellow'),
    },
    {
      label: 'Forth',
      data: 5,
      ...datasetColorGenerator('green'),
    },
    {
      label: 'Purple',
      data: 2,
      ...datasetColorGenerator('purple'),
    },
    {
      label: 'Orange',
      data: 3,
      ...datasetColorGenerator('orange'),
    },
  ],
};
