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
			<div className="add-content info">
				<div className="add-content-header header">
					<i class="fas fa-arrow-left" onClick={this.toggleTabs}></i>
					<div className="add-content-title">Add Semester/Course</div>
					<div className="extra"></div>
				</div>
				<div></div>
			</div>;
		} 

		else {
		
			checkTab = 
			<div className="check-courses info">
				<div className="check-courses-header header">
					<i className="fas fa-plus" onClick={this.toggleTabs}></i>
				</div>
				<div className="add-content-body">Add a semester or course by clicking the + </div>
				<div className="check-courses-body">All of your classes are good.</div>
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
		<div className={props.className}>
			<div className="TEST test1">
				<div className="TEST-abbr">CRSE-100</div>
				<div className="TEST-name">Mfg. in Crse. Desn. & Analysis</div>
			</div>
			<div className="TEST test2">
				<div className="TEST-abbr">CRSE-200</div>
				<div className="TEST-name">Mfg. in Crse. Desn. & Analysis: Cool stuff</div>
			</div>
			<div className="TEST test3">
				<div className="TEST-abbr">CRSE-300</div>
				<div className="TEST-name">Learning to Code 101: An Introduction</div>
			</div>
			<div className="TEST test4">
				<div className="TEST-abbr">CRSE-400</div>
				<div className="TEST-name">How to Make an A+ in College</div>
			</div>
		</div>
	); 	
}

// SemesterList holds each of the semesters
class SemesterList extends Component {
	render() {
		return(
			<div className="semester-list main">
				<Semester className="semester semester-1"/>
				<Semester className="semester semester-2"/>
				<Semester className="semester semester-3"/>
				<Semester className="semester semester-4"/>
				<Semester className="semester semester-5"/>
				<Semester className="semester semester-6"/>
				<Semester className="semester semester-7"/>
				<Semester className="semester semester-8"/>
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
			<div className="hours-box main">Hours: </div>
			<div className="check-courses-btn main">Check Courses</div>
		</div>
    );
  }
}



export default App;
