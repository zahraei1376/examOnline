import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import './progressLsit.scss';
// import { useEffect } from 'react';


// const data = [
//   { argument: 1, value: 10 },
//   { argument: 2, value: 20 },
//   { argument: 3, value: 30 },
// ];


// const data = [
//   { argument: 1, value: 10 },
//   { argument: 2, value: 0 },
//   { argument: 3, value: 30 },
// ];
// 
export default ({ data }) => {
  // useEffect(()=>{
  // alert(JSON.stringify(data));
  // });
  return (
    <Paper>
      <Chart
        data={data}
      >
        <ArgumentAxis />
        <ValueAxis style={{ backgroundColor: 'red' }} />

        <LineSeries valueField="value" argumentField="argument" />
      </Chart>
    </Paper>
  )
};
//////////////////////////////////////////////////////////////////////////
// import * as React from 'react';
// import {
//   Chart,
//   ArgumentAxis,
//   ValueAxis,
//   LineSeries,
//   Title,
//   Legend,
// } from '@devexpress/dx-react-chart-bootstrap4';
// import { Animation } from '@devexpress/dx-react-chart';

// // import { confidence as data } from '../../../demo-data/data-vizualization';

// const format = () => tick => tick;
// const Root = props => (
//   <Legend.Root
//     {...props}
//     className="m-auto flex-row"
//   />
// );
// const Item = props => (
//   <Legend.Item
//     {...props}
//     className="flex-column"
//   />
// );
// const Label = props => (
//   <Legend.Label
//     {...props}
//     className="pt-2"
//   />
// );

// const ValueLabel = (props) => {
//   const { text } = props;
//   return (
//     <ValueAxis.Label
//       {...props}
//       text={`${text}%`}
//     />
//   );
// };

// export default class Demo extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data:props.data
//     };
//   }

//   render() {
//     const { data: chartData } = this.state;

//     return (
//       <div className="card">
//         <Chart
//           data={chartData}
//           className="pr-3"
//         >
//           <ArgumentAxis tickFormat={format} />
//           <ValueAxis
//             max={50}
//             labelComponent={ValueLabel}
//           />
// {/* 
//           <LineSeries
//             name="TV news"
//             valueField="tvNews"
//             argumentField="year"
//           />
//           <LineSeries
//             name="Church"
//             valueField="church"
//             argumentField="year"
//           /> */}
//           <LineSeries
//             name="Military"
//             valueField="military"
//             argumentField="year"
//           />
//           <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
//           <Title
//             text={`Confidence in Institutions in American society ${'\n'}(Great deal)`}
//           />
//           <Animation />
//         </Chart>
//       </div>
//     );
//   }
// }
