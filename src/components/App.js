import React, { Component } from 'react';
import '../styles//css/App.css';

/* 
	CheckAdd will allow the user to add courses and semesters
	You can check that the prereq requirements are met by clicking 
	"Check Courses"
*/
class CheckAdd extends Component {
	constructor(props) {
		super(props); 
		this.state = {isToggleOn: false}; 

		this.toggleTabs = this.toggleTabs.bind(this);
	}

	toggleTabs(e) {
		this.setState(state => ({
			isToggleOn: !state.isToggleOn
		}));
	}

	render() {
		let checkTab; 
		let addTab; 

		if(this.state.isToggleOn) {
			checkTab = " "; 

			addTab = 
			<div className="add-content">
				<div className="add-content-header">
					<i class="fas fa-arrow-left" onClick={this.toggleTabs}></i>
						Add Semester/Course
				</div>
				
			</div>;
		} 

		else {
		
			checkTab = 
			<div className="check-courses">
				<div className="check-courses-header">
					<i class="fas fa-plus" onClick={this.toggleTabs}></i>
					<div className="add-content-body">Add a semester or course by clicking the + </div>
					<span className="output-text">All of your classes are good.</span> 
				</div>
				<div className="check-courses-body"></div>
			</div>; 

			addTab = " ";
		}
	    return (
			<div className="info-box main">	
				{checkTab}
				{addTab}
			</div>
	    );
  	}
}

// Each Course contains information including prereq and coreqs for the course
class Course extends Component {
	render() {
		return(
			<div className="course">Course</div>
		);
	}
}

// A Semester holds a default number of courses
function Semester(props) {
	return(
		<div className={props.className}></div>
	); 
}

// SemesterList holds each of the semesters
class SemesterList extends Component {
	render() {
		return(
			<div className="semester-list main"> Semsters
				<Semester className="semester-1"/>
				<Semester className="semester-2"/>
				<Semester className="semester-3"/>
				<Semester className="semester-4"/>
				<Semester className="semester-5"/>
				<Semester className="semester-6"/>
				<Semester className="semester-7"/>
				<Semester className="semester-8"/>
			</div>
		);
	}
}


// The whole page is contained within the App
class App extends Component {
  render() {
    return(
		<div className="App">
			<SemesterList />
			<CheckAdd />
			<div className="footer main">Hours: </div>
			<div className="btn main">Check Courses</div>
		</div>
    );
  }
}



export default App;
