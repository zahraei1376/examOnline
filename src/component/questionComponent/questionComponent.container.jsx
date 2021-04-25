import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import  MySpinner from '../MySpinner/MySpinner.component';
import Questions from './questionComponent';

const GET_ALL_QUESTIONS_FOR_EXAM = gql`
query examParents(
    $userName: String!,
    $password: String!,
    $id:  String!
    ){
    examParents(
      userName: $userName,
      password: $password,
      id:$id
    ){
      id
      examParent_start_date
      examParent_stop_date
      examParent_start
      examParent_end
      examParent_pId
      examParent_gId
      examParent_maxScore
      examParent_method
      examParent_topic
      examChild
      {
        id
        examChild_gId
        examChild_epId
        questionParent
        {
          id
          ecId
          questionChild
          {
            id
            qpId
            question
            question_score
            question_explain
            question_timeToSolveProblem
            question_correctOption
            question_optionOne
            question_optionTwo
            question_optionThree
            question_optionFour
            question_link
            exam_link
            question_type
            question_seqItems
            question_vancyItems
            question_compItems
          }
        }
      }
    }
  }
`;

// const getAllUsersQuery = gql`
// {
//   groupsListByPerson(userName: "210", password: "210") {
//     pId
//     class
//     level
//     course
//   }
// }
// `;
const MergeQuestions = (examP) => {
    console.log('examP', examP );
    var mergeQ = [];
    var allQuestons = examP.examChild;
    for (let index = 0; index < allQuestons.length; index++) {
       
        if(allQuestons[index].questionParent && allQuestons[index].questionParent.length > 0){
            console.log('allQuestons[index].questionParent', allQuestons[index].questionParent );
            mergeQ.push(allQuestons[index].questionParent[0])
        }
        
        // examChild[0].questionParent
        // const element = array[index];
        
    }
    console.log('mergeQ',mergeQ);
    return mergeQ;
}

const QuestionsComponentContainer = ()=>(
    <Query query={GET_ALL_QUESTIONS_FOR_EXAM} variables={{userName:"211" , password:"211" , id:"607fd8fb3fb30a08d7ce1e53"}}>
            {({loading ,error , data }) => {
                    // console.log({loading});
                    // console.log({error});
                    
                    
                    if(loading) return <MySpinner/>
                    if(data){
                        // console.log('data',data.examParents[0] );
                        return <Questions questions={MergeQuestions(data.examParents[0])} />
                    }
                    
            }}
    </Query>
);

export default QuestionsComponentContainer;