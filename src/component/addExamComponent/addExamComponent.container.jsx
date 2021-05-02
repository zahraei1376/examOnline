import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import  MySpinner from '../MySpinner/MySpinner.component';
import AddExamForTeacher from './addExamComponent.component';

const GET_GROUPS_WITH_ID = gql`
    query groupsListByPerson($userName: String!, $password: String!){
        groupsListByPerson(userName: $userName, password: $password){
            pId
            class
            level
            course
        }
    }
`;

const getAllUsersQuery = gql`
{
  groupsListByPerson(userName: "210", password: "210") {
    pId
    class
    level
    course
  }
}
`;

const AddExamForTeacherContainer = ()=>(
    <Query query={GET_GROUPS_WITH_ID} variables={{userName:"211" , password:"211"}}>
            {({loading ,error , data }) => {
                    // console.log({loading});
                    // console.log({error});
                    console.log({data});
                    
                    if(loading) return <MySpinner/>
                    else if(error) return <MySpinner/>
                    else return <AddExamForTeacher MyGroups={data.groupsListByPerson} />
                    
                    
            }}
    </Query>
);

export default AddExamForTeacherContainer;