import React, { useState, useEffect } from 'react';
import './popupPercentageQuestion.scss';
import axios from 'axios';
import ProgressList from './PopupPercentageQuestionChart';

const PopupPercentageQuestion = props => {

  /////////////////////////////////////////
  const [getData, setDate] = useState([]);
  useEffect(() => {
    axios({
      method: 'post',
      url: '/averageQuestions',
      // timeout: 1800000, // Let's say you want to wait at least 180 seconds
      data: {
        exam_id: props.exam_id,
        level: props.level,
        class_name: props.class_name,
      },
    })
      .then(res => {
        // alert(JSON.stringify(res.data.PercentageArray));
        if (res.data.PercentageArray) {
          setDate(res.data.PercentageArray);
          // setArg(res.data.PercentageArg);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
    <div className="popupPercentageQuestion">
      <div className="popupPercentageQuestion__content">
        <ul className="popupPercentageQuestion__noticeDiv">
          <li className="popupPercentageQuestion__notice">محور عمودی جواب های درست و بر حسب درصد میباشد</li>
          <li className="popupPercentageQuestion__notice">محور افقی شماره سوال میباشد.</li>
        </ul>
        <div className="popupPercentageQuestion__Chart">
          {getData.length > 0 ? <ProgressList data={getData} /> : <h1 className="popupPercentageQuestion__h1">وجود ندارد</h1>}
        </div>


      </div>
      <button className="popupPercentageQuestion__btnClose" onClick={props.close}>
        بستن
        </button>
    </div>
  );
};

export default PopupPercentageQuestion;
