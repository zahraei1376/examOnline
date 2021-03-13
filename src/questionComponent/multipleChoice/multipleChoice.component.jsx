import React ,{useState , useEffect} from "react";
import MaterialTable from 'material-table';
import {loadVariable} from '../questionComponent';
// var load = false;

const MultipleChoice = (props) => {
    // const { useState } = React;
    const [innerData, setInnerData] = useState([]);
    // var innerData;
    var tableInnerRef = React.createRef();

    useEffect(()=>{
      // console.log('load',loadVariable.load);
      if(!loadVariable.load){
        console.log('load1',loadVariable.load);
        // console.log(props.rowData);
        loadVariable.load = true;
        console.log('load2',loadVariable.load);
        setInnerData(props.rowData);
      }

      return ()=>{
        loadVariable.load = false;
        console.log('load3',loadVariable.load);
      }
    },[]);

    // function addRow(t){
    //     setInnerData(t);
    // }

    // useEffect(()=>{
    //   console.log('innerData');
    //   console.log(innerData);
    //   // setData(props.rowData);
    // },[innerData])
  
    const [innerColumns, setInnerColumns] = useState([
      {
        title: 'questionID', field: 'questionID',
        // editComponent: props => (
        //   <input
        //     type="text"
        //     value={props.value}
        //     onChange={e => props.onChange(e.target.value)}
        //   />
        // )
      },
      { title: 'axamQuestions_id', field: 'axamQuestions_id' },
      { title: 'question', field: 'question' },
      ///////////////////////////////////////
      // { title: 'Surname', field: 'surname' },
      // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      // {
      //   title: 'Birth Place',
      //   field: 'birthCity',
      //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      // },
    ]);
  
    // const [data, setData] = useState([
    //   { questionID: 'questionID', axamQuestions_id: 'axamQuestions_id', question: 'question',},
    //   // { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    // ]);
  
    return (
      <div>
      {innerData.length > 0 ? <MaterialTable
        title=""
        tableRef={tableInnerRef}
        columns={innerColumns}
        data={innerData}
        options={{
          pageSize: 1,
          pageSizeOptions: [1,],
          sorting: true,
          paging: false,
            search: false,
            toolbar:false,
            cellStyle: {
              backgroundColor: '#eee',
              color: '#000'
            },
            headerStyle: {
              backgroundColor: '#039be5',
            }
            
          }}
        actions={[
          {
            icon: 'delete',
            tooltip: 'حذف',
            onClick: (event, rowData) => {
              // Do save operation
                const dataDelete = [...innerData];
                const index = rowData.tableData.id;
                dataDelete.splice(index, 1);
                setInnerData([...dataDelete]);
            }
          },
          // {
          //   icon: 'edit',
          //   tooltip: 'ویرایش',
          //   onClick: (event, rowData) => {
          //     // Do save operation
          //       const dataDelete = [...innerData];
          //       const index = rowData.tableData.id;
          //       dataDelete.splice(index, 1);
          //       setInnerData([...dataDelete]);
          //   }
          // }
        ]}
        editable={{
          // onRowUpdateCancelled: rowData => {
          //   loadVariable.load = false;
          //   console.log('onRowUpdateCancelled',loadVariable.load);
          // },
          // onEditingCanceled :(mode, rowData) => {
              
          //   // this.cancelAdd();

          //   // props.onEditingCanceled(mode);
          //   loadVariable.load = false;
          //   console.log('onRowUpdateCancelled',loadVariable.load);
          // },
          onRowUpdateCancelled: rowData => {
            loadVariable.load = true;
            console.log('onRowUpdateCancelled',loadVariable.load);
          },
          // onRowDeleteCancelled: rowData => {
          //   loadVariable.load = true;
          //   console.log('onRowDeleteCancelled',loadVariable.load);
          // },
        //   onRowAdd: newData =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         setInnerData([...innerData, newData]);
                
        //         resolve();
                
        //       }, 1000)
        //     }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...innerData];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setInnerData([...dataUpdate]);
  
                resolve();
                reject(loadVariable.load = false);
              }, 1000)
            }),
          // onRowDelete: oldData =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       const dataDelete = [...innerData];
          //       const index = oldData.tableData.id;
          //       dataDelete.splice(index, 1);
          //       setInnerData([...dataDelete]);
  
          //       resolve();
          //     }, 1000)
          //   }),
        }}
      /> : ''}
      </div>
    )
};

export default MultipleChoice;