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
  var tableRef = React.createRef();
  // useEffect(()=>{
  //   // fetchData();
  //   console.log('reloadddddddddd');
    
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
    // { questionID: '1', },
    // { questionID: '2', },
    // { name: '3', },
    // { name: '4', },
    { questionID: '1',axamQuestions_id:'111',question:'zzzz',},
    { questionID: '2',axamQuestions_id:'222',question:'zzzz',},
    { questionID: '3',axamQuestions_id:'333',question:'zzzz',},
  ]);
  // const [data, setData] = useState([
  //   // { questionID: '1', },
  //   // { questionID: '2', },
  //   // { name: '3', },
  //   // { name: '4', },
  //   // { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
  //   //   { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
  // ]);
  // const [count,setCount]=useState(1);
  // useEffect(()=>{
  //   console.log('count',count);
    
  // },[count]);

  function createArray(item){
    var tempAray=[];
    tempAray.push(item);
    return tempAray;
  }
    
  return (
    <MaterialTable
      title="سوالات"
      tableRef={tableRef}
      columns={[
        { title: 'questionID', field: 'questionID' },
        // { title: 'axamQuestions_id', field: 'axamQuestions_id' },
        // { title: 'question', field: 'question' },
        //////////////////////////
        // { title: 'Surname', field: 'surname' },
        // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        // {
        //   title: 'Birth Place',
        //   field: 'birthCity',
        //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        // },
      ]}
      data={data}
      detailPanel={[
        {
          tooltip: 'سوال تشریحی',
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
                    return <MultipleChoice rowData={createArray(rowData)}/>
                })()}

              </div>
            )
          },
        },
        {
          icon: 'account_circle',
          tooltip: 'Show Surname',
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
                    return <DescriptiveQuestion rowData={createArray(rowData)}/>
                })()}
              </div>
            )
          },
        },
        {
          icon: 'favorite_border',
          // openIcon: 'favorite',
          tooltip: 'Show Both',
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
                    return <TrueAndFalse rowData={createArray(rowData)}/>
                })()}
              </div>
            )
          },
        },
        {
          icon: 'favorite_border',
          // openIcon: 'favorite',
          tooltip: 'Show Both',
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
                    return <Vacancy rowData={createArray(rowData)}/>
                })()}
              </div>
            )
          },
        },
        {
          icon: 'favorite_border',
          // openIcon: 'favorite',
          tooltip: 'Show Both',
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
                    return <Comparative rowData={createArray(rowData)}/>
                })()}
              </div>
            )
          },
        },
        {
          icon: 'favorite_border',
          // openIcon: 'favorite',
          tooltip: 'Show Both',
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
                    return <Sequential rowData={createArray(rowData)}/>
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


  export default Questions;