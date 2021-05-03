import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import  MySpinner from '../component/MySpinner/MySpinner.component';
import QuestionPage from './questionPage.component';

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
      examParent_duration
      examParent_pId
      examParent_gId
      examParent_maxScore
      examParent_method
      examParent_topic
      examParent_random
      examParent_backward
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

const QuestionsPageContainer = ()=>(
    <Query query={GET_ALL_QUESTIONS_FOR_EXAM} variables={{userName:"211" , password:"211" , id:"608e8876fdd2f026a23a7166"}}>
            {({loading ,error , data }) => {
                    // console.log({loading});
                    // console.log({error});
                    
                    
                    if(loading) return <MySpinner/>
                    if(data){
                        // console.log('data',data.examParents[0] );
                        return <QuestionPage questions={MergeQuestions(data.examParents[0])} />
                    }
                    
            }}
    </Query>
);

export default QuestionsPageContainer;