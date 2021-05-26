import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
/////////////////////////////
import {QuestionsInfosContainer , QuestionsInfoContainer,HeaderContainer ,HeaderGroup ,HeaderTitle} from './questionsInfo.styles';
import QuestionInfo from './questionInfo/questionInfo.component';
// /////////////////////////////query
import { useQuery} from 'react-apollo';
import { GET_EXAMCHILD_QUESTIONSInfo } from '../../graphql/resolver';
/////////////////////////////////
import {selectedExamParentId} from '../../redux/questionsCourses/questionsCourses.selector';
// '../../../redux/questionsCourses/questionsCourses.selector';
// //////////////////////////////////
import {connect} from 'react-redux';
import { createStructuredSelector} from 'reselect';
/////////////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // marginBottom: '30px',
    fontFamily: 'Bnazanin',
    // boxShadow:'0 0 1px 1px rgba(0,0,0,.2)',
    // border:'2px solid #000',
    color:'#000',
    marginBottom:'4rem',
  },
  heading: {
    // fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    // fontSize: theme.typography.pxToRem(15),
    fontFamily:'Bnazanin',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '100%',
    color:'#000',
    fontSize:'2rem',
    // color: theme.palette.text.secondary,
  },
}));

const QuestionsHeader = ({ courses ,selectedEPId}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [courseList,setCourseList] = useState(courses ? courses : '')
  ///////////////////////////////////////////////////////////
  const { loading, error, data ,refetch  } = useQuery(GET_EXAMCHILD_QUESTIONSInfo , {
    variables: { 
      userName: "211",
      password: "211",
      id: selectedEPId,
      // examChild_gId:'',
    },
    notifyOnNetworkStatusChange: true
  });

  useEffect(()=>{
    console.log('dddddddddddddddddddddddddd');
  })


  useEffect(()=>{
    console.log('datadatadata',data);
    if(data){
      var myCourses = [];
      var examChildsInfo = data.examParents[0].examChild;
      for (let index = 0; index < courses.length; index++) {
        var flag = false;
        for (let index2 = 0; index2 < courses[index].group.length; index2++) {
          for (let index3 = 0; index3 < examChildsInfo.length; index3++) {
            if(courses[index].group[index2] == examChildsInfo[index3].examChild_gId)
            {
              myCourses.push({
                  ...courses[index] , negativeCoefficient:examChildsInfo[index3].examChild_falseCoefficient ,
               coefficient:examChildsInfo[index3].examChild_courseCoefficient,
               examChild_pdf:examChildsInfo[index3].examChild_pdf ? examChildsInfo[index3].examChild_pdf : ''
                })
                flag=true;
            }
          }
          
          
        }

        if(!flag){
          // console.log('nnnnnnnnnnnn');
          myCourses.push({...courses[index]})
        }
        // if(courses[index].group[0] == data.examParents[0].examChild[0].examChild_gId)
        // {
          
        //   console.log('ffffff');
        //   console.log('data.examParents[0].examChild[0].examChild_falseCoefficient',data.examParents[0].examChild[0].examChild_falseCoefficient);
        //   console.log('data.examParents[0].examChild[0].examChild_courseCoefficient',data.examParents[0].examChild[0].examChild_courseCoefficient);
        //   myCourses.push({
        //       ...courses[index] , negativeCoefficient:data.examParents[0].examChild[0].examChild_falseCoefficient ,
        //    coefficient:data.examParents[0].examChild[0].examChild_courseCoefficient,
        //    examChild_pdf:data.examParents[0].examChild[0].examChild_pdf ? data.examParents[0].examChild[0].examChild_pdf : ''
        //     })
        // }else{
        //   console.log('nnnnnnnnnnnn');
        //   myCourses.push({...courses[index]})
        // }
        
      }
    //  console.log('data.examParents[0].examChild[0].Child_gId',data.examParents[0].examChild[0].examChild_gId);
    //   var myCourses = courses.map(cour => cour.group[0] == data.examParents[0].examChild[0].examChild_gId ?
    //      {...cour , negativeCoefficient:data.examParents[0].examChildByGId[0].examChild_falseCoefficient ,
    //        coefficient:data.examParents[0].examChildByGId[0].examChild_courseCoefficient} 
    //      : {...cour} );

      setCourseList(myCourses);
      console.log('myCourses',myCourses);
    }
  },[data]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // useEffect(()=>{
  //     console.log('courses',courses);
  //     // for (let index = 0; index < array.length; index++) {
  //     //   const element = array[index];
        
  //     // }
  // },[data])

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.secondaryHeading}>اطلاعات سوالات</Typography>
        </AccordionSummary>
        <AccordionDetails style={{
          // width:'100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'BNazanin',
          fontSize:'1.3rem',
          direction: 'rtl',
          // overflowX:'scroll',
          // position:'relative',
        }}>
          <QuestionsInfosContainer>
            <HeaderContainer>
              <HeaderGroup>
                  <HeaderTitle>نام درس</HeaderTitle>
              </HeaderGroup>
              <HeaderGroup>
                  <HeaderTitle>فایل</HeaderTitle>
              </HeaderGroup>
              <HeaderGroup>
                  <HeaderTitle>ضریب منفی</HeaderTitle>
              </HeaderGroup>
              <HeaderGroup>
                  <HeaderTitle>ضریب درس</HeaderTitle>
              </HeaderGroup>
              <HeaderGroup>
                  <HeaderTitle>ارسال</HeaderTitle>
              </HeaderGroup>
            </HeaderContainer>
              {
                  courseList && courseList.length > 0 ? 
                  courseList.map((course , index) =>(
                      <QuestionsInfoContainer key={index}>
                          <QuestionInfo course={course}/>
                      </QuestionsInfoContainer>
                  ))
                  : ''
              }
            </QuestionsInfosContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  selectedEPId:selectedExamParentId,
});

export default connect(mapStateToProps)(QuestionsHeader);