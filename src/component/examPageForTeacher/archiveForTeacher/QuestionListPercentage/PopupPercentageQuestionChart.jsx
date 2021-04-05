import * as React from 'react';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Animation } from '@devexpress/dx-react-chart';


export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data
    };
  }

  componentDidMount() {
    console.log(this.props.data);
  }

  render() {
    const { data: chartData } = this.state;


    return (
      <div className="card">
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis max={50} />

          <BarSeries
            valueField="value"
            argumentField="argument"
          />
          {/* <Title style={{ fontFamily: 'BNazanin', textAlign: 'center' }} text="جزییات گزارش امتحان" /> */}
          <Animation />
        </Chart>
      </div>
    );
  }
}


