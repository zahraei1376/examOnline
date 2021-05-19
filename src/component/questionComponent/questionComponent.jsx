import React ,{useState , useEffect} from "react";
import MaterialTable from 'material-table';
import CustomEditComponent from './innerQuestion.jsx';
import DescriptiveQuestion from './descriptiveQuestion/descriptiveQuestion.component';
import MultipleChoice from './multipleChoice/multipleChoice.component';
import TrueAndFalse from './trueAndFalse/trueAndFalse.component';
import Comparative from './Comparative/Comparative.component';//تطبیقی
import Vacancy from './Vacancy/Vacancy.component';//جای خالی
import Sequential from './Sequential/Sequential.component';//ترتیبی
import {QuestionImageIconContainer ,QuestionImageIcon ,QuestionImageIconText,QuestionImageIconTextV,AddRowBtn} from './questionComponent.styles';
import descriptiveIcon from '../../assets/img/descriptiveQuestion.png';
import descriptiveIcon2 from '../../assets/img/descriptiveQuestion2.png';
import multiChoice from '../../assets/img/multiChoice.png';
import multiChoice2 from '../../assets/img/multiChoice2.png';
import trueFalse from '../../assets/img/trueFalse.png';
import trueFalse2 from '../../assets/img/trueFalse2.png';
import ellipsis from '../../assets/img/ellipsis.png';
import ellipsis2 from '../../assets/img/ellipsis2.png';
import compareIcon from '../../assets/img/compare.png';
import compareIcon2 from '../../assets/img/compare2.png';
import SequentialIcon from '../../assets/img/SequentialIcon.png';
import SequentialIcon2 from '../../assets/img/SequentialIcon2.png';
///////////////////////////////////////////////
import {connect} from 'react-redux';
import { createStructuredSelector} from 'reselect';
import {selectedCourseName ,selectedExamParentId} from '../../redux/questionsCourses/questionsCourses.selector';
import {ToggleQuestion} from '../../redux/toggleQuesion/toggleQuestion.selector';
// import setToggle from "../../redux/toggleQuesion/toggleQuestion.action.js";
/////////////////////////query
import { gql } from 'apollo-boost';
import { useQuery ,useMutation} from 'react-apollo';
import { GET_QUESTIONS ,GET_EXAMCHILD_QUESTIONS } from '../../graphql/resolver';
import { Icon } from "@material-ui/core";
/////////////////////////query
export var loadVariable = {
  load:false,
  // disable:false,
};
/////////////////////////
const SET_QUESTIONPARENT = gql`
  mutation addQuestionParent(
    $userName: String!,
    $password: String!,
    $epId: String!,
    $gId: [String]!,
    ){
      addQuestionParent(
          userName: $userName,
          password: $password,
          epId: $epId,
          gId: $gId,
      ){
        id
      }
  }
`;

const DELETE_QUESTIONPARENT = gql`
  mutation deleteQuestionParent(
    $userName: String!,
    $password: String!,
    $id: String!,
    ){
      deleteQuestionParent(
          userName: $userName,
          password: $password,
          id: $id
      ){
        id
      }
  }
`;

const SET_QUESTION_CHILD = gql`
  mutation addQuestionChild(
      $userName: String!,
      $password: String!,
      $qpId: String!,
      $question: String!,
      $question_score: String!,
      $question_explain: String!,
      $question_timeToSolveProblem: String!,
      $question_correctOption: String!,
      $question_optionOne: String!,
      $question_optionTwo: String!,
      $question_optionThree: String!,
      $question_optionFour: String!,
      $question_link: String!,
      $exam_link: String!,
      $question_type: String!,
      $question_seqItems: [String]!,
      $question_vancyItems: String!,
      $question_compItems: [String]!,
      ){
      addQuestionChild(
        userName: $userName,
        password: $password,
        qpId: $qpId,
        question: $question,
        question_score: $question_score,
        question_explain: $question_explain,
        question_timeToSolveProblem: $question_timeToSolveProblem,
        question_correctOption: $question_correctOption,
        question_optionOne: $question_optionOne,
        question_optionTwo: $question_optionTwo,
        question_optionThree: $question_optionThree,
        question_optionFour: $question_optionFour,
        question_link: $question_link,
        exam_link: $exam_link,
        question_type: $question_type,
        question_seqItems: $question_seqItems,
        question_vancyItems: $question_vancyItems,
        question_compItems: $question_compItems,
      ){
        id
      }
  }
`;
/////////////////////////
const Questions = ({toggle ,courseName, examParentId,selectedEPId, questions}) =>{
  // const [innerData, setInnerData] = useState([]);
  // const tableRef = React.useRef(null);
  const [setQuestionParent ,{ QuestionParentData }] = useMutation(SET_QUESTIONPARENT);
  const [deleteQuestionParent ,{ DQuestionParentData }] = useMutation(DELETE_QUESTIONPARENT);
  // const { loading, error, data ,refetch  } = useQuery(GET_QUESTIONS , {
  //   variables: {  
  //     userName: "211",
  //     password: "211",
  //     id: selectedEPId , //examParentId,
  //   },
  //   notifyOnNetworkStatusChange: true
  // });
  //////////
  const { loading, error, data ,refetch  } = useQuery(GET_EXAMCHILD_QUESTIONS , {
    variables: {  
      userName: "211",
      password: "211",
      id: selectedEPId , //examParentId,
      examChild_gId : courseName && courseName.length > 0 ? courseName[0] : '',
    },
    notifyOnNetworkStatusChange: true
  });

  useEffect(()=>{
    console.log('examParentId' ,examParentId);
  },[])
  // const [typeQuestion,setTypeQuestion] =useState('');

  const MergeQuestions = (examP) => {
    console.log('examP', examP );
    var mergeQ = [];
    var allQuestons = examP.examChildByGId;
    for (let index = 0; index < allQuestons.length; index++) {
       var counterQuestionsParent = allQuestons[index].questionParent;
        if(counterQuestionsParent && counterQuestionsParent.length > 0){
          for (let j = 0; j < counterQuestionsParent.length; j++) {
              console.log('allQuestons[index].questionParent[j]', allQuestons[index].questionParent[j] );
              mergeQ.push(allQuestons[index].questionParent[j])
          }
            // console.log('allQuestons[index].questionParent', allQuestons[index].questionParent );
            // mergeQ.push(allQuestons[index].questionParent[0])
        }
    }
    console.log('mergeQ',mergeQ);
    return mergeQ;
  }

  // useEffect(()=>{
  //   console.log('typeQuestion',typeQuestion)
  // },[typeQuestion])

  useEffect(() => {
    if (data && data.examParents && data.examParents.length > 0) {
      console.log('get dataaaaaaaaa' ,data);
      setData(MergeQuestions(data.examParents[0]))
    }
  }, [data])
  ///////////////////////////////////////////////
  const handleFetchData = ()=>{
    // console.log('fetchhhhhhhhhhhhhh');
    refetch()
  }
  ///////////////////////////////////////////////
  const [QuestionsData, setData] = useState([
  ]);
  /////////////////////////////////////////
  function createArray(item){
    console.log('item', item);
    var tempAray=[];
    tempAray.push(item);
    console.log('item2', tempAray);
    return tempAray;
  }
  /////////////////////////////////////////
  function MyCreateArray(id , tableId){
    var tempAray=[];
    tempAray.push({
      // 'id': tableId ,
      'id': '' ,
      'question': '', 
      'question_score':'',
      'question_explane':'',
      'question_timeToSolveProblem':'',
      'exam_link':'',//with question
      // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',//replace question
      'question_compItems':[],
      // 'StudentItem':'2',
      'question_correctOption':'',
      'question_optionOne':'',
      'question_optionTwo':'',
      'question_optionThree':'',
      'question_optionFour':'',
      'question_SeqItems':[],
      'question_vancyItems':'',
      'question_type':'-1',
      'qpId' : id,
      //////////////////////////////////////////
  });
    console.log('item2', tempAray);
    return tempAray;
  }
  ///////////////////////////////////////
  const handleAddRow = () =>{
    document.querySelector("[data-mycustomid='add-icon-handler']").parentNode.click();
  }
    
  return (
    <div style={{position:'relative'}}>
    <AddRowBtn onClick={handleAddRow}>
        افزودن سوال
    </AddRowBtn>
    <MaterialTable
     style={{direction:'rtl'}}
    // dir="rtl"
      title="سوالات"
      icons={{
        Add: props => <Icon data-mycustomid={"add-icon-handler"} />
      }}
      options={{
        pageSize: 20,
        // actionsColumnIndex: -1,
        search: false,
        // paging: false,
            // search: false,
            // toolbar:false,
        
        // tableLayout: "auto", 
        actionsCellStyle:{
          padding:'0 40px',
        },
        actionsColumnIndex: -1,
    // toolbarButtonAlignment:"left",
        toolbarButtonAlignment:"right", // here is the option to change toolbar buttons' alignment
        cellStyle: {
          textAlign:'center',
        },
        headerStyle: {
          textAlign:'center',
        },
        // toolbarStyle:{
        //   backgroundColor:'#000',
        // }
        
        // rowStyle: rowData => ({
        //   border: (selectedRow === rowData.tableData.id) ? '1px solid #ff6542' : '1px solid inherit'
        // })
        // rowStyle: rowData => ({
        //   backgroundColor: this.state.selected && rowData.tableData.id === this.state.selectedRowId 
        //   ?   '#000'
        //       : "#fff" 
        //   })
      }}
      
      columns={[
        // { title: 'آیدی سوال', field: 'questionID'},
        {
          title: 'شماره' , field: 'questionID', textAlign: 'center',
           render : rowData => rowData && (rowData.tableData.id + 1),
          // editable: 'never'
        },
      ]}

      data={QuestionsData}
      detailPanel={[
        (rowData)=>({
          disabled:toggle,
          // disabled:rowData.question_type == '1' ? false :true,
          icon: () => (rowData && rowData.questionChild && rowData.questionChild.length > 0 && rowData.questionChild[0].question_type != '1') || rowData && rowData.questionChild.length === 0  ? (<QuestionImageIconContainer><QuestionImageIcon src={descriptiveIcon}/>
          {/* <QuestionImageIconText>تشریحی</QuestionImageIconText> */}
          </QuestionImageIconContainer>) : (<QuestionImageIconContainer><QuestionImageIcon src={descriptiveIcon2}/>
            {/* <QuestionImageIconTextV>تشریحی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={descriptiveIcon2}/>
            {/* <QuestionImageIconTextV>تشریحی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: 'سوال تشریحی',
          // tooltip: toggle ? 'سوال تشریحی' : null,
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  // color: 'white',
                  // backgroundColor: '#E53935',
                }}
              >
                {/* {rowData.question} */}
                {(() => {
                    // setTypeQuestion(1);
                    // console.log('rowData',rowData);
                    // console.log('rowData && rowData.questionChild.lenght',rowData && rowData.questionChild);
                    // return <DescriptiveQuestion selectedCourseName={selectedCourseName} handleFetchData={handleFetchData} 
                    // rowData={rowData && rowData.questionChild.length > 0   ? createArray(rowData.questionChild[0]) : 
                    //   createArray(rowData.questionChild)
                    //   // [{}]
                    // }
                    return <DescriptiveQuestion 
                    // selectedCourseName={selectedCourseName}
                     handleFetchData={handleFetchData} 
                      rowData={rowData && rowData.questionChild && rowData.questionChild.length > 0   ? createArray(rowData.questionChild[0]) : 
                        MyCreateArray(rowData.id ,rowData.tableData.id + 1 )
                      // [{}]
                    }
                    // MyCreateArray
                    // rowData={rowData.questionChild[0]} 
                    // && rowData.questionChild.lenght > 0 
                    typeQuestion={"1"} />
                    // setSelectedRow(rowData.tableData.id);
                    // return <DescriptiveQuestion selectedCourseName={selectedCourseName} handleFetchData={handleFetchData} rowData={createArray(rowData)} typeQuestion={typeQuestion} />
                })()}
              </div>
            )
          },
        }),
        (rowData)=>({
          disabled:toggle,
          // disabled:rowData.question_type == '2' ? false :true,
          // disabled: typeQuestion == 2 ? false : toggle,
          // icon: () => (<QuestionImageIconContainer src={multiChoice}/>),
          icon: () => (rowData && rowData.questionChild && rowData.questionChild.length > 0 && rowData.questionChild[0].question_type != '2') || rowData && rowData.questionChild.length === 0  ? (<QuestionImageIconContainer><QuestionImageIcon src={multiChoice}/>
          {/* <QuestionImageIconText>چهار گزینه ای</QuestionImageIconText> */}
          </QuestionImageIconContainer>) 
          :
          (<QuestionImageIconContainer><QuestionImageIcon src={multiChoice2}/>
            {/* <QuestionImageIconTextV>چهار گزینه ای</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: 'سوال چهار گزینه ای',
          // tooltip: toggle ? 'سوال چهار گزینه ای' : null,
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={multiChoice2}/>
            {/* <QuestionImageIconTextV>چهار گزینه ای</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  // color: 'white',
                  // backgroundColor: '#43A047',
                }}
              >
                {(() => {
                  // setTypeQuestion(2);
                  // setSelectedRow(rowData.tableData.id);
                    return <MultipleChoice 
                    // selectedCourseName={selectedCourseName}
                     handleFetchData={handleFetchData}
                    // rowData={rowData && rowData.questionChild.length > 0   ? createArray(rowData.questionChild[0]) : createArray(rowData)}
                    // rowData={createArray(rowData)}
                    rowData={rowData && rowData.questionChild && rowData.questionChild.length > 0   ? createArray(rowData.questionChild[0]) : 
                      MyCreateArray(rowData.id ,rowData.tableData.id + 1 )
                    // [{}]
                  }
                     typeQuestion={"2"}/>
                })()}

              </div>
            )
          },
        }),
        (rowData)=>({
          disabled:toggle,
          // disabled:rowData.question_type == '3' ? false :true,
          // disabled: typeQuestion == 3 ? false : toggle,
          // icon: () => (<QuestionImageIconContainer src={trueFalse}/>),
          icon: () => (rowData && rowData.questionChild && rowData.questionChild.length > 0 && rowData.questionChild[0].question_type != '3') || rowData && rowData.questionChild.length === 0  ? (<QuestionImageIconContainer><QuestionImageIcon src={trueFalse}/>
          {/* <QuestionImageIconText>دو گزینه ای</QuestionImageIconText> */}
          </QuestionImageIconContainer>)
          :
          (<QuestionImageIconContainer><QuestionImageIcon src={trueFalse2}/>
            {/* <QuestionImageIconTextV>دو گزینه ای</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={trueFalse2}/>
            {/* <QuestionImageIconTextV>دو گزینه ای</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: 'سوال دو گزینه ای',
          // tooltip: toggle ? 'سوال دو گزینه ای' : null,
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  // color: 'white',
                  // backgroundColor: '#FDD835',
                }}
              >
                {/* {rowData.question} {rowData.axamQuestions_id} */}
                
                {(() => {
                  // setTypeQuestion(3);
                  // setSelectedRow(rowData.tableData.id);
                    return <TrueAndFalse 
                    // selectedCourseName={selectedCourseName}
                     handleFetchData={handleFetchData} 
                    // rowData={rowData && rowData.questionChild.length > 0   ? createArray(rowData.questionChild[0]) : createArray(rowData)}
                    // rowData={createArray(rowData)}
                    rowData={rowData && rowData.questionChild && rowData.questionChild.length > 0   ? createArray(rowData.questionChild[0]) : 
                      MyCreateArray(rowData.id ,rowData.tableData.id + 1 )
                    // [{}]
                  }
                     typeQuestion={"3"}/>
                })()}
              </div>
            )
          },
        }),
        (rowData)=>({
          disabled:toggle,
          // disabled:rowData.question_type == '4' ? false :true,
          // disabled: typeQuestion == 4 ? false : toggle,
          // icon: () => (<QuestionImageIconContainer src={ellipsis}/>),
          icon: () => (rowData && rowData.questionChild && rowData.questionChild.length > 0 && rowData.questionChild[0].question_type != '4') || rowData && rowData.questionChild.length === 0 ? (<QuestionImageIconContainer><QuestionImageIcon src={ellipsis}/>
          {/* <QuestionImageIconText>جای خالی</QuestionImageIconText> */}
          </QuestionImageIconContainer>) :
          (<QuestionImageIconContainer><QuestionImageIcon src={ellipsis2}/>
            {/* <QuestionImageIconTextV>جای خالی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={ellipsis2}/>
            {/* <QuestionImageIconTextV>جای خالی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: toggle ? 'سوال جای خالی' : null,
          render: rowData => {
            return (
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                {(() => {
                    return <Vacancy 
                    // selectedCourseName={selectedCourseName}
                     handleFetchData={handleFetchData} 
                    // rowData={rowData && rowData.questionChild.length > 0   ? createArray(rowData.questionChild[0]) : createArray(rowData)}
                    // rowData={createArray(rowData)}
                    rowData={rowData && rowData.questionChild && rowData.questionChild.length > 0   ? createArray(rowData.questionChild[0]) : 
                      MyCreateArray(rowData.id ,rowData.tableData.id + 1 )
                  }
                     typeQuestion={"4"}/>
                })()}
              </div>
            )
          },
        }),
        (rowData)=>({
          disabled:toggle,
          // disabled:rowData.question_type == '5' ? false :true,
          // disabled: typeQuestion == 5 ? false : toggle,
          // icon: () => (<QuestionImageIconContainer src={compareIcon}/>),
          icon: () => (rowData && rowData.questionChild && rowData.questionChild.length > 0 && rowData.questionChild[0].question_type != '5') || rowData && rowData.questionChild.length === 0  ? (<QuestionImageIconContainer><QuestionImageIcon src={compareIcon}/>
          {/* <QuestionImageIconText>تطبیقی</QuestionImageIconText> */}
          </QuestionImageIconContainer>)
          :
          (<QuestionImageIconContainer><QuestionImageIcon src={compareIcon2}/>
            {/* <QuestionImageIconTextV>تطبیقی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={compareIcon2}/>
            {/* <QuestionImageIconTextV>تطبیقی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: 'سوال تطبیقی',
          // tooltip: toggle ? 'سوال تطبیقی' : null,
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  // color: 'white',
                  // backgroundColor: '#FDD835',
                }}
              >
                {/* {rowData.question} {rowData.axamQuestions_id} */}
                
                {(() => {
                  // setTypeQuestion(5);
                  // setSelectedRow(rowData.tableData.id);
                    return <Comparative 
                    // selectedCourseName={selectedCourseName}
                     handleFetchData={handleFetchData} 
                    // rowData={createArray(rowData)}
                    // rowData={rowData && rowData.questionChild.length > 0   ? createArray(rowData.questionChild[0]) : createArray(rowData)}
                    rowData={rowData && rowData.questionChild && rowData.questionChild.length > 0   ? createArray(rowData.questionChild[0]) : 
                      MyCreateArray(rowData.id ,rowData.tableData.id + 1 )
                    // [{}]
                  } 
                    typeQuestion={"5"}/>
                })()}
              </div>
            )
          },
        }),
        (rowData)=>({
          // disabled:rowData.question_type == '6' ? false :true,
          disabled:toggle,
          // disabled: typeQuestion == 6 ? false : toggle,
          // icon: () => (<QuestionImageIcon src={SequentialIcon}/>),
          icon: () => (rowData && rowData.questionChild && rowData.questionChild.length > 0 && rowData.questionChild[0].question_type != '6') || rowData && rowData.questionChild.length === 0  ? (<QuestionImageIconContainer><QuestionImageIcon src={SequentialIcon}/>
          {/* <QuestionImageIconText>ترتیبی</QuestionImageIconText> */}
          </QuestionImageIconContainer>)
          :
          (<QuestionImageIconContainer><QuestionImageIcon src={SequentialIcon2}/>
            {/* <QuestionImageIconTextV>ترتیبی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={SequentialIcon2}/>
            {/* <QuestionImageIconTextV>ترتیبی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: 'سوال ترتیبی',
          // tooltip: toggle ? 'سوال ترتیبی' : null,
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  // color: 'white',
                  // backgroundColor: '#FDD835',
                }}
              >
                {/* {rowData.question} {rowData.axamQuestions_id} */}
                
                {(() => {
                  // setTypeQuestion(6);
                  // setSelectedRow(rowData.tableData.id);
                    return <Sequential 
                    // selectedCourseName={selectedCourseName}
                     handleFetchData={handleFetchData} 
                    // rowData={rowData.questionChild[0] ? createArray(rowData.questionChild[0]) : ''}
                    // rowData={rowData && rowData.questionChild.length > 0   ? createArray(rowData.questionChild[0]) : createArray(rowData)}
                    // rowData={createArray(rowData)}
                    rowData={rowData && rowData.questionChild && rowData.questionChild.length > 0   ? createArray(rowData.questionChild[0]) : 
                      MyCreateArray(rowData.id ,rowData.tableData.id + 1 )
                    // [{}]
                  }
                     typeQuestion={"6"}/>
                })()}
              </div>
            )
          },
        }),
        
      ]}

      // onToggleDetailPanel={() => console.log('test11111111')}
      // onTreeExpandChange={() => console.log('test22222222')}
      editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                console.log('courseName' , { variables: { 
                  userName: "211",
                  password: "211",
                  // ecId: courseName,
                  epId:selectedEPId,
                  gId: courseName,
                  }} );
                setTimeout(() => {
                  // setData([...QuestionsData, newData]);
                  setQuestionParent({ variables: { 
                    userName: "211",
                    password: "211",
                    // ecId: courseName,
                    epId:selectedEPId,
                    gId: courseName,
                    } 
                  }).then(res=>{
                    console.log('res = ' , res.data);
                    if(res.data && res.data.addQuestionParent){
                      handleFetchData();
                      // console.log('data',data);
                      // setMessage('امتحان ثبت شد');
                      // setStatus('1');
                      // setShowMessage(!showMessage);
                    }else{
                      handleFetchData();
                      // console.log('data',data);
                      // setStatus('0')
                      // setMessage('امتحان ثبت نشد')
                      // setShowMessage(!showMessage);
                    }
                  })
                  resolve();
                }, 1000)
              }),
            // onRowUpdate: (newData, oldData) =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       const dataUpdate = [...data];
            //       const index = oldData.tableData.id;
            //       dataUpdate[index] = newData;
            //       setData([...dataUpdate]);
    
            //       resolve();
            //     }, 1000)
            //   }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  // console.log('id',oldData)
                  const dataDelete = [...QuestionsData];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  deleteQuestionParent({ variables: { 
                    userName: "211",
                    password: "211",
                    id: oldData.id
                    } 
                  }).then(res=>{
                    if(res.data && res.data.deleteQuestionParent){
                      handleFetchData();
                      // console.log('data',data);
                      // setMessage('امتحان ثبت شد');
                      // setStatus('1');
                      // setShowMessage(!showMessage);
                    }else{
                      handleFetchData();
                      // console.log('data',data);
                      // setStatus('0')
                      // setMessage('امتحان ثبت نشد')
                      // setShowMessage(!showMessage);
                    }
                  })
                  setData([...dataDelete]);
    
                  resolve();
                }, 1000)
              }),
      }}
    />
    </div>
  )
}

// const mapStateToProps = state =>({
//     toggle : state.toggle.toggle,
// })

// const mapDispatchToProps = dispatch =>({
//   setToggle: tog => dispatch(setToggle(tog)),
// })

const mapStateToProps = createStructuredSelector({
  toggle:ToggleQuestion,
  courseName : selectedCourseName,
  selectedEPId:selectedExamParentId,
});

export default connect(mapStateToProps)(Questions);