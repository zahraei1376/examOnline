import React, { useEffect, useState } from 'react';
import './ranking.scss';
import RankingBox from './rankingBox';
import axios from 'axios';
import PopUpProgress from '../progressList/popupProgress';

const Ranking = ({ Nameclass, level, axamId, courseName }) => {
  const [listTopStudent, setListTopStudent] = useState([]);
  const [showPopUpProgress, setShowPopUpProgress] = useState(false);
  const [studentId, setStudentId] = useState('');
  const closePopUp = () => {
    setShowPopUpProgress(!showPopUpProgress);
  }
  useEffect(() => {
    axios({
      method: 'post',
      url: '/getStudentListWithRanking',
      data: {
        level: level,
        class_name: Nameclass,
        exam_id: axamId,
      },
    })
      .then(res => {
        setListTopStudent([]);
        if (res.data.topStudent) {
          setListTopStudent(res.data.topStudent);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [axamId, Nameclass]);



  return (
    <div>
      <div className="titr">
        <div className="titr_tem">
          <p className="titr_img">عکس</p>
          <p className="titr_name">نام</p>
          <p className="titr_score">نمره</p>
        </div>
        <div className="titr_num">
          <p className="titr_name">شماره</p>
        </div>

      </div>
      {listTopStudent.length > 0 ?
        listTopStudent.map((top, index) => (
          <div key={index}>
            <RankingBox top={top} score={top[0]} name={top[1]} id={top[2]} key={index} number={index} click={closePopUp} setStudentId={setStudentId} />
          </div>
        ))
        : ''
      }
      {showPopUpProgress ? (
        <PopUpProgress close={closePopUp} courseName={courseName} level={level} Nameclass={Nameclass} studentId={studentId} />
      ) : (
          ''
        )}
    </div>
  )
};

export default Ranking;