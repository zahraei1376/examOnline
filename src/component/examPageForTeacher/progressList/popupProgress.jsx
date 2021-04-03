import React, { useState, useEffect } from 'react';
import './popupProgress.scss';
import axios from 'axios';
import ProgressList from '../progressList/progressList';

const PopUpProgress = props => {
  /////////////////////////////////////////
  const [getData, setDate] = useState([]);
  useEffect(() => {
    axios({
      method: 'post',
      url: '/getProgress',
      data: {
        level: props.level,
        class_name: props.Nameclass,
        courseName: props.courseName,
        student_id: props.studentId
      },
    })
      .then(res => {
        if (res.data.data) {
          setDate(res.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="popUpProgress">
      <div className="popUpProgress__content">
        <ProgressList data={getData} />
      </div>
      <button className="popUpProgress__btnClose" onClick={props.close}>
        بستن
      </button>
    </div>
  );
};

export default PopUpProgress;
