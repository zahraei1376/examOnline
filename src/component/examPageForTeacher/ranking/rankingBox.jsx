import React from 'react';
import './rankingBox.scss';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

const RankingBox = ({ top, score, name, id, click, setStudentId, number, key }) => {
  const user = useSelector(({ auth }) => auth.user);

  const handlePopUpProgress = () => {
    if (user.role.indexOf('student') !== -1 && id == user.user.person_id) {
      setStudentId(id);
      click();
    } else if (user.role.indexOf('teacher') !== -1) {
      setStudentId(id);
      click();
    }
  }

  return (
    <Grid key={key} item xs={12} sm={12} md={12} style={{ padding: "0", }}>
      {/* ///////////////////////////// */}
      <div className={number < 3 ? "cardRenk changeBackColor" : "cardRenk"} onClick={handlePopUpProgress}>
        <div className={number < 3 ? "cardRenk_header changeColor" : "cardRenk_header"}>
          <div className="cardRenk_header-imgDiv">
            <img src={require('assets/image/img/user.png')} alt="" className="cardRenk_img" />
          </div>
          <strong className="cardRenk_header-name">{name}</strong>
          <strong className="cardRenk_header-score">{score}</strong>
        </div>
        <strong className="cardRenk_number">{number + 1}</strong>
      </div>
    </Grid>

  )
};

export default RankingBox;