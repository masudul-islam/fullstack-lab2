import React, { Component } from 'react';
import axios from "axios";

class App extends Component{
    state = {
        loading: true,
        tableData: null,
        ASC : "ASC",
        DSC:"DSC",
        order: "ASC",
        dataToDisplay : []   
    }
    intervalId = null;

    sorting = (col)=>{
        if(this.state.order === this.state.ASC){
            const sorted = [...this.state.dataToDisplay].sort((a,b)=>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1 
            
            );
            this.setState({dataToDisplay : sorted})
            this.setState({order:this.state.DSC}) 
            
        }
        if(this.state.order === this.state.DSC){
            const sorted = [...this.state.dataToDisplay].sort((a,b)=>{
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1 
            });
            this.setState({dataToDisplay : sorted})
            this.setState({order:this.state.ASC}) 
        }
    }

    getData = () => {
        axios.get("http://localhost:3000/api/data")
        .then((res) => this.setState({tableData:res.data,loading:false})
        .catch(err => console.log(err))

        )}

    componentDidMount(){
      this.getData();
      
     this.intervalId = setInterval(() => {
        this.getData();
        this.listOfData();
        console.log("the list have the data", this.state.dataToDisplay ," and lenght is : ", this.state.dataToDisplay.length)
     }, 5000)
    }   

    componentWillUnmount() {
      clearInterval(this.intervalId)
    }

    listOfData = ()=>{
        let list = []
            for(let obj of this.state.tableData){
            list.push({
                student_id: obj.student_id,
                student_name : `${obj.student.name}`,
                course_Code: `${obj.course_Code}`,
                date: `${obj.date}`,
                course_Name : `${obj.Courses.course_Name}`
            })
        }
        // dataToDisplay
        this.setState({dataToDisplay:list})  
    }

    render(){
        const { loading, tableData } = this.state
        return(
            <div>
                <h1 class="banner">Student Table</h1>
                {loading || !tableData ? (
                    <div><h2>loading data...</h2></div>
                ) : (
                    <table class="table_responsive">
                        <thead>
                            <th>Student ID</th>
                            <th onClick={()=> this.sorting("student_name")}>Student Name</th>
                            <th onClick={()=>this.sorting("course_Code")}>Course Code</th>
                            <th onClick={()=>this.sorting("course_Name")}>Course Name</th>
                            <th onClick={()=>this.sorting("date")} >Registration Time</th> 
                        </thead>
                            <tbody>
                                {/* for data display */}
                            {this.state.dataToDisplay.map((d)=> (
                                <tr  key={d.id}>
                                <td>{d.student_id}</td>
                                <td>{d.student_name}</td>
                                <td>{d.course_Code}</td>
                                <td>{d.course_Name}</td>
                                <td>{d.date}</td>
                                </tr>
                                ))}
                            </tbody>
                    </table>
                )}
            </div>
        )
    }
}
export default App ;