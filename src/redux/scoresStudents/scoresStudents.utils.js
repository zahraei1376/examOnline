
export const addStudentUtil = (student,students)=>{
    return students.push(student);
}

export const IncreaseScoreUtil = (index,score ,students ,studentId)=>{
    const existStudent = students.find(student => student.studentId === studentId);

    // if(existStudent){
    //     Object.entries(student)
    // }

    if(existStudent){
        students.map(student => 
            student.studentId === studentId ? Object.entries(student).map(item =>
                    item[0] === index ? 
                    
                    {...student ,  } 
                    : {...student ,  }
                
                ) 
            : {...student}
        )
    }
    // return students.push(student);
}

export const DecreseScoreUtil = (index,score ,students)=>{
    return students.push(student);
}