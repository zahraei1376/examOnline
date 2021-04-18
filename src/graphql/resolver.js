import { gql } from 'apollo-boost';

const addNewExamMutation = gql`
    mutation addExamParent(
        $userName: String!,
        $password: String!, 
        $examParent_gId:[ID]!,
        $examParent_start_date: String!, 
        $examParent_stop_date: String!, 
        $examParent_start: String!,
        $examParent_end: String!, 
        $examParent_maxScore: String!, 
        $examParent_method:String!,
        $examParent_topic:String!
        ){
            addExamParent(
                userName: $userName, 
                password:$password, 
                examParent_gId: $examParent_gId,
                examParent_start_date: $examParent_start_date, 
                examParent_stop_date: $examParent_stop_date,
                examParent_start: $examParent_start,
                examParent_end: $examParent_end, 
                examParent_maxScore: $examParent_maxScore, 
                examParent_method: $examParent_method,
                examParent_topic: $examParent_topic
                ){
                    userName
                }
        }
`;

export { addNewExamMutation, };