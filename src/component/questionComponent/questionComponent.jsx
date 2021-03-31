import React ,{useState , useEffect} from "react";
import MaterialTable from 'material-table';
import CustomEditComponent from './innerQuestion.jsx';
import DescriptiveQuestion from './descriptiveQuestion/descriptiveQuestion.component';
import MultipleChoice from './multipleChoice/multipleChoice.component';
import TrueAndFalse from './trueAndFalse/trueAndFalse.component';
import Comparative from './Comparative/Comparative.component';//تطبیقی
import Vacancy from './Vacancy/Vacancy.component';//جای خالی
import Sequential from './Sequential/Sequential.component';//ترتیبی
import {QuestionImageIconContainer ,QuestionImageIcon ,QuestionImageIconText,QuestionImageIconTextV} from './questionComponent.styles';
// import DeleteIcon from '../../assets/img/iconDelete.png';
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
import {ToggleQuestion} from '../../redux/toggleQuesion/toggleQuestion.selector';




export var loadVariable = {
  load:false,
  // disable:false,
};

const Questions = ({toggle}) =>{
  // const [innerData, setInnerData] = useState([]);
  const [typeQuestion,setTypeQuestion] =useState('');
  // const [disable,setDisable] =useState(false);
  useEffect(()=>{
    // fetchData();
    console.log('typeQuestion' , typeQuestion);
    
  },[typeQuestion]);

  // useEffect(()=>{
  //   // fetchData();
  //   console.log('toggle' , toggle);
    
  // })
  ///////////////////////////////////
  async function fetchData(){
    await fetch('http://localhost:9001',{
      method:'post',
      headers:{'Content-Type':'aplication/json'},
      body:JSON.stringify({
        query:
          `
          mutation:{
            getQuestions(
              input_Question:{
                question_id:${1}
              }
            ){
              questionID
              axamQuestions_id
              question
              question_link
              question__optionOne
              question__optionTwo
              question__optionTree
              question__optionFour
              question__currentOption
              question__timeTosolveProblem
              question__score
              question__explane
              exam_link
            }
          }
          `
      })

    })
    .then(res => res.json)
    .then(response => {
      setData(response.data)
    });
  }
  ///////////////////////////////////////////////
 
  const [data, setData] = useState([
    { questionID: '1',axamQuestions_id:'111',question:'zzzz',},
    { questionID: '2',axamQuestions_id:'222',question:'zzzz',},
    { questionID: '3',axamQuestions_id:'333',question:'zzzz',},
  ]);
  /////////////////////////////////////////

  function createArray(item){
    var tempAray=[];
    tempAray.push(item);
    return tempAray;
  }
  const [selectedRow, setSelectedRow] = useState(null);

  // useEffect(()=>{
  //     console.log('toggle',toggle);
  // },[toggle])
    
  return (
    <MaterialTable
      title="سوالات"
      // tableRef={tableRef}
      // onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
      options={{
        search: true,
        // paging: false,
            // search: false,
            // toolbar:false,
        actionsColumnIndex: -1,
        actionsCellStyle:{
          padding:'0 40px',
        },
        toolbarButtonAlignment:"right", // here is the option to change toolbar buttons' alignment
        cellStyle: {
          textAlign:'center',
        },
        headerStyle: {
          textAlign:'center',
        },
        
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
        // { title: 'آیدی سوال', field: 'questionID' },
      ]}
      data={data}
      detailPanel={[
        {
          disabled:toggle,
          icon: () => (<QuestionImageIconContainer><QuestionImageIcon src={descriptiveIcon}/>
          {/* <QuestionImageIconText>تشریحی</QuestionImageIconText> */}
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
                    setTypeQuestion(1);
                    // setSelectedRow(rowData.tableData.id);
                    return <DescriptiveQuestion rowData={createArray(rowData)} typeQuestion={typeQuestion} />
                })()}
              </div>
            )
          },
        },
        {
          disabled:toggle,
          // icon: () => (<QuestionImageIconContainer src={multiChoice}/>),
          icon: () => (<QuestionImageIconContainer><QuestionImageIcon src={multiChoice}/>
          {/* <QuestionImageIconText>چهار گزینه ای</QuestionImageIconText> */}
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
                  setTypeQuestion(2);
                  // setSelectedRow(rowData.tableData.id);
                    return <MultipleChoice rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}

              </div>
            )
          },
        },
        {
          disabled:toggle,
          // icon: () => (<QuestionImageIconContainer src={trueFalse}/>),
          icon: () => (<QuestionImageIconContainer><QuestionImageIcon src={trueFalse}/>
          {/* <QuestionImageIconText>دو گزینه ای</QuestionImageIconText> */}
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
                  setTypeQuestion(3);
                  // setSelectedRow(rowData.tableData.id);
                    return <TrueAndFalse rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}
              </div>
            )
          },
        },
        {
          disabled:toggle,
          // icon: () => (<QuestionImageIconContainer src={ellipsis}/>),
          icon: () => (<QuestionImageIconContainer><QuestionImageIcon src={ellipsis}/>
          {/* <QuestionImageIconText>جای خالی</QuestionImageIconText> */}
          </QuestionImageIconContainer>),
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={ellipsis2}/>
            {/* <QuestionImageIconTextV>جای خالی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: toggle ? 'سوال جای خالی' : null,
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
                  setTypeQuestion(4);
                  // setSelectedRow(rowData.tableData.id);
                    return <Vacancy rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}
              </div>
            )
          },
        },
        {
          disabled:toggle,
          // icon: () => (<QuestionImageIconContainer src={compareIcon}/>),
          icon: () => (<QuestionImageIconContainer><QuestionImageIcon src={compareIcon}/>
          {/* <QuestionImageIconText>تطبیقی</QuestionImageIconText> */}
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
                  setTypeQuestion(5);
                  // setSelectedRow(rowData.tableData.id);
                    return <Comparative rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}
              </div>
            )
          },
        },
        {
          disabled:toggle,
          // icon: () => (<QuestionImageIcon src={SequentialIcon}/>),
          icon: () => (<QuestionImageIconContainer><QuestionImageIcon src={SequentialIcon}/>
          {/* <QuestionImageIconText>ترتیبی</QuestionImageIconText> */}
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
                  setTypeQuestion(6);
                  // setSelectedRow(rowData.tableData.id);
                    return <Sequential rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}
              </div>
            )
          },
        },
        
      ]}
      editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  
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
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
    
                  resolve();
                }, 1000)
              }),
      }}
    />
  )
}

// const mapStateToProps = state =>({
//     toggle : state.toggle.toggle,
// })

const mapStateToProps = createStructuredSelector({
  toggle:ToggleQuestion
});


export default connect(mapStateToProps)(Questions);