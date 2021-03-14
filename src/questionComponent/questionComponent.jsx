import React ,{useState , useEffect} from "react";
import MaterialTable from 'material-table';
import CustomEditComponent from './innerQuestion.jsx';
import DescriptiveQuestion from './descriptiveQuestion/descriptiveQuestion.component';
import MultipleChoice from './multipleChoice/multipleChoice.component';
import TrueAndFalse from './trueAndFalse/trueAndFalse.component';
import Comparative from './Comparative/Comparative.component';//تطبیقی
import Vacancy from './Vacancy/Vacancy.component';//جای خالی
import Sequential from './Sequential/Sequential.component';//ترتیبی


export var loadVariable = {
  load:false,
};

const Questions = () =>{
  // const [innerData, setInnerData] = useState([]);
  const [typeQuestion,setTypeQuestion] =useState('');
  var tableRef = React.createRef();
  useEffect(()=>{
    // fetchData();
    console.log('typeQuestion' , typeQuestion);
    
  },[typeQuestion])
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
    
  return (
    <MaterialTable
      title="سوالات"
      tableRef={tableRef}
      options={{
        search: true,
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
        }
      }}
      
      columns={[
        // { title: 'آیدی سوال', field: 'questionID' },
      ]}
      data={data}
      detailPanel={[
        {
          icon: 'account_circle',
          openIcon: 'favorite',
          tooltip: 'سوال تشریحی',
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#E53935',
                }}
              >
                {/* {rowData.question} */}
                {(() => {
                    setTypeQuestion(1);
                    return <DescriptiveQuestion rowData={createArray(rowData)} typeQuestion={typeQuestion} />
                })()}
              </div>
            )
          },
        },
        {
          tooltip: 'سوال چهار گزینه ای',
          openIcon: 'favorite',
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#43A047',
                }}
              >
                {(() => {
                  setTypeQuestion(2);
                    return <MultipleChoice rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}

              </div>
            )
          },
        },
        {
          icon: 'favorite_border',
          openIcon: 'favorite',
          tooltip: 'سوال دو گزینه ای',
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#FDD835',
                }}
              >
                {/* {rowData.question} {rowData.axamQuestions_id} */}
                
                {(() => {
                  setTypeQuestion(3);
                    return <TrueAndFalse rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}
              </div>
            )
          },
        },
        {
          icon: 'favorite_border',
          openIcon: 'favorite',
          tooltip: 'سوال جای خالی',
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#FDD835',
                }}
              >
                {/* {rowData.question} {rowData.axamQuestions_id} */}
                
                {(() => {
                  setTypeQuestion(4);
                    return <Vacancy rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}
              </div>
            )
          },
        },
        {
          icon: 'favorite_border',
          openIcon: 'favorite',
          tooltip: 'سوال تطبیقی',
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#FDD835',
                }}
              >
                {/* {rowData.question} {rowData.axamQuestions_id} */}
                
                {(() => {
                  setTypeQuestion(5);
                    return <Comparative rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}
              </div>
            )
          },
        },
        {
          icon: 'favorite_border',
          openIcon: 'favorite',
          tooltip: 'سوال ترتیبی',
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#FDD835',
                }}
              >
                {/* {rowData.question} {rowData.axamQuestions_id} */}
                
                {(() => {
                  setTypeQuestion(6);
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
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
    
                  resolve();
                }, 1000)
              }),
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


  export default Questions;