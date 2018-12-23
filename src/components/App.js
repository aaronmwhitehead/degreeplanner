import React, { Component } from 'react';
import '../styles//css/App.css';
import {DraggableAreasGroup, DraggableArea} from 'react-draggable-tags';



var data = require('../data'); 
var new_schedule = data.degree_plans[0].courses; 
var old_schedule = data.degree_plans[1].courses;
var old_semesters = data.degree_plans[1].semesters; 
var new_semesters = data.degree_plans[0].semesters; 
var showInfo = false;
var totalHours; 

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();

class Summer extends Component {
	constructor(props) {
		super(props); 
		this.state = {checked: false}
		this.handleCheck = this.handleCheck.bind(this);
	}

	handleCheck() {
		this.setState({
			checked: !this.state.checked
		});
		var summerSelector = document.querySelector(".summer"+this.props.value);
		const change = this.state.checked ? summerSelector.style.display = "none" : summerSelector.style.display = "flex"; 
	}

	render() {
		return <div value={this.props.value}>
				<input type="checkbox" className={this.props.className} checked={ this.state.checked } onChange={ this.handleCheck } />
		    </div>
	}
}

class CheckAdd extends Component {
	constructor(props) {
		super(props); 
		this.state = {isToggleOn: true}; 
		this.toggleTabs = this.toggleTabs.bind(this);
	}

	toggleTabs(e) {
		this.setState(state => ({
			isToggleOn: !state.isToggleOn
		}));
		var contentSelector = document.querySelector(".add-content")
		const change = this.state.isToggleOn ? contentSelector.style.visibility = "visible" : contentSelector.style.visibility = "hidden"
		let summerList = document.querySelectorAll(".summer"); 
		for(var i = 0; i < summerList.length; i++) {
			var summer = i+1; 
			if(summerList[i].childNodes[0].hasChildNodes())
				document.querySelector(".check-summer-"+summer).disabled = true; 
			else
				document.querySelector(".check-summer-"+summer).disabled = false; 
		}
	}

	handleClickAdd() {
		var sem = document.querySelector(".draggable-area"); 
		sem.addTag({id: 1 , name: 4});
	}

	render() {

		let checkTab; 
		let addTab; 

		checkTab = 
			<div className="check-courses info">
				<div className="check-courses-header header">
					<i className="fas fa-plus" onClick={this.toggleTabs}></i>
				</div>
				<div className="small-info check-courses-body-info">
					<i className="material-icons lu_arrow up">arrow_left</i>
					Add a semester or course by clicking the + 
				</div>
				<div className="check-courses-body">All of your classes are good.</div>
				<div className="small-info check-courses-btn-info">
					<i className="material-icons lu_arrow down">arrow_left</i>
					Check the status of your degree plan by clicking below
				</div>
			</div>; 

			addTab = 
			<div className="add-content">
				<div className="add-content-modal">
					<div className="add-content-header header">
						<i className="fas fa-arrow-left" onClick={this.toggleTabs}></i>
						<div className="add-content-title">Add Semester/Course</div>
						<div className="spacer"></div>
					</div>
					<div className="add-content-body">
						<div className="add-semester">
							<div className="add-summer">
								<span className="add-summer-title">Summer 1</span>
								<Summer className="check-summer-1" value="1"/>
							</div>
							<div className="add-summer">
								<span className="add-summer-title">Summer 2</span>
								<Summer className="check-summer-2" value="2"/>
							</div>
							<div className="add-summer">
								<span className="add-summer-title">Summer 3</span>
								<Summer className="check-summer-3" value="3"/>
							</div>
							<div className="add-summer">
								<span className="add-summer-title">Summer 4</span>
								<Summer className="check-summer-4" value="4"/>
							</div>
							<div className="add-summer">
								<span className="add-summer-title">Summer 5</span>
								<Summer className="check-summer-5" value="5"/>
							</div>
						</div>
						<div className="add-course">
							<span className="user-course-name">Course</span><input type="text" className="user-course-input" name="user-course-name"/>
							<span className="user-course-name">Hours</span><input type="text" className="user-course-input" name="user-course-hours"/>
							<button className="user-course-submit" onClick={addNewCourse}>Submit</button>
							<div className="inputs">
								<input ref={r => this.input = r} />
								<button onClick={this.handleClickAdd}>Add</button>
							</div>
							<div className="disclaimer">NOTE: Added courses will not have prereqs checked</div>
						</div>
					</div>
				</div>
			</div>; 

	    return (
			<div className="info-box main">	
				{checkTab} 
				{addTab}
			</div>
	    );
  	}
}

function addNewCourse() {
	document.querySelector(".semester0"); 
}

function getParentValueOfCourse(currID) {
	var semesterValue = document.querySelector("#"+currID).parentNode.parentNode.parentNode.parentNode.getAttribute("value"); 
	return semesterValue; 
}

function checkCourses() {
	var allCourses = document.querySelectorAll(".course"); 
	var filterCourses = []; 
	var isValid = true;
	for(let i = 0; i < allCourses.length; i++) {
		if(i % 2 === 0) {
			filterCourses.push(allCourses[i]); 
		}
	}
	let checkBody = document.querySelector(".check-courses-body"); 
	checkBody.innerHTML = ""; 
	filterCourses.forEach(course => {
		var prereqList = course.dataset.prereqs.split(","); 
		var coreqList = course.dataset.coreqs.split(","); 
		var semesterValue = getParentValueOfCourse(course.id); 
		for(let i = 0; i < prereqList.length; i++){
			if(prereqList[i] !== "null") {
				if(getParentValueOfCourse(prereqList[i]) >= semesterValue && semesterValue != 0) {
					isValid = false; 
					checkBody.innerHTML += document.querySelector("#"+prereqList[i]).childNodes[0].innerHTML + " is a prereq of " + course.childNodes[0].innerHTML + "<br>"
				}
			}
		}
		for(let i = 0; i < coreqList.length; i++){
			if(coreqList[i] !== "null") {
				if(getParentValueOfCourse(coreqList[i]) > semesterValue && semesterValue != 0) {
					isValid = false; 
					checkBody.innerHTML += document.querySelector("#"+coreqList[i]).childNodes[0].innerHTML + " is a coreq of " + course.childNodes[0].innerHTML + "<br>"
				}
			}
		}
	}); 
	if(isValid) checkBody.innerHTML = "All of your classes are good."
}

function Populate(val) {
	const courseList = old_schedule.map(i => {
		if(i.semester == val) {
			return i; 
		}
	}); 
	var filter = courseList.filter(function (e) {
		return e != null; 
	}); 

	return filter; 
}

function UpdateHours(semester) {
	totalHours = 0; 
	let currSemester = document.querySelector(semester);
	let currCourses = currSemester.querySelectorAll(".course"); 

	for(let i = 0; i < currCourses.length; i++) {
		totalHours = +totalHours + +currCourses[i].dataset.hours; 
	}
	totalHours = +totalHours/2; 
	return totalHours; 
}

class Semester extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			hours: this.props.hours
		}
		this.updateHours = this.updateHours.bind(this); 
	}; 

	updateHours() {
		var mySemester = "semester"+this.props.value; 
		UpdateHours("."+CSS.escape(mySemester)); 
		this.setState({hours: totalHours});
	}

	render() {
		return(
			<div className={this.props.className} value={this.props.value}>
		    	<DraggableArea1 className="draggable-area"
		    		initialTags = {Populate(this.props.value)}
		    		render={({tag}) => (
		    			<div id={tag.id} data-hours={tag.hours} data-prereqs={tag.prereqs} data-coreqs={tag.coreqs} data-semester={tag.semester} className={tag.classes}>
		    				<span className="course-abbr">{tag.display_name}</span>
		    				<span className="course-name">{tag.full_name}</span>
		    				<div className="hours-indicator">{tag.hours}</div>
		    			</div>
		    		)}
		    		getAddTagFunc={addTag => this.addTag = addTag}
		    		onChange={this.updateHours}
		    	/>
		    	<div className="semester-hours">{this.state.hours}</div>
		    </div>
		); 
	}
}

// SemesterList holds each of the semesters
class SemesterList extends Component {
	render() {
		var semesterArray = []; 
		semesterArray.push(<div className="year">AP & DUAL CREDIT</div>)
		semesterArray.push(<Semester className="semester semester0" value="0" hours="0"/>); 
		for(var i = 0; i < old_semesters.length; i++) {
			if(i % 3 === 0)
				semesterArray.push(<div className="year">Year {i/3+1}</div>)
			semesterArray.push(<Semester className={old_semesters[i].classes} value={old_semesters[i].value} hours={old_semesters[i].hours}/>); 
		}
		return (
		  <div className="semester-list main"> 
				{semesterArray}
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
			<div className="container">
				<CheckAdd />
				<div className="check-courses-btn main" onClick={checkCourses}>Check Courses</div>
			</div>
		</div>
    );
  }
}

export default App;
