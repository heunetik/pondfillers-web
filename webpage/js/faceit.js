/*

	pondfillers' Faceit stats Chrome Extension
    Copyright (C) 2017  heunetik

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
   
*/

document.addEventListener('DOMContentLoaded', function () {
	//document.getElementById('kdr_3').addEventListener('click', kd_stats);
	//document.getElementById('kdr_l').addEventListener('click', l_kd_stats);
	// document.getElementById('steamid').addEventListener('click', getUserName);
	//document.getElementById('query').addEventListener('click', getUserName);
	document.querySelector("input[class=textbox]").addEventListener('keypress', function (e)
	{
	    var key = e.which || e.keyCode;
	    if (key === 13)
	    {
	    	e.preventDefault();
	    	getUserName();
		}
	});
});
function getUserName() {
    var nameField = document.getElementById('nameField').value;
    $('#stats').hide();
    faceit(nameField);
}

function faceit(fName){
	var faceit = $('#faceit');
	faceit.html(" ");
	$('#flag').attr("src", '' );
	$.getJSON('https://api.faceit.com/core/v1/nicknames/'+fName, function(json)
	{
		un_id = json.payload.guid;
		var cflag = json.payload.country;
		cflag = cflag.toUpperCase();
		$('#flag').attr("src", 'https://cdn.faceit.com/frontend/335/assets/images/flags/' + cflag + '.png' );
	    faceit.html("<b class='shadow'>ELO: " + json.payload.games.csgo.faceit_elo + "<br> Level: " + json.payload.games.csgo.skill_level + "</b>");
	    //lastmatches();	    
	    
	}).done(function() {
    	lastThreeStats(un_id,faceit);
  	});
}

function lastThreeStats(un_id,faceit){
	$.getJSON('https://api.faceit.com/stats/v1/stats/time/users/'+ un_id +'/games/csgo?page=0&size=3', function(jObj)
	{
		var kills = 0;
	    var deaths = 0;
	    var k_d = 0;
		for(var i=0; i<3; i++)
	        {
	        	match = jObj[i];
	        	kills = kills + parseFloat(match.i6);
	        	deaths = deaths + parseFloat(match.i8);
	        }
	    k_d = kills / deaths;
	    k_d = k_d.toFixed(2);
	    faceit.append("<br><b class='shadow'>K/D: " + k_d + " @ last 3</b>");
	}).done(function() {
    	lifetimeStats(un_id,faceit);
  	});
}

function lifetimeStats(un_id,faceit){
	$.getJSON('https://api.faceit.com/stats/v1/stats/users/'+ un_id +'/games/csgo', function(jObj)
	{
	    faceit.append("<br><b class='shadow'>K/D: " + jObj.lifetime.k5 + " @ " + jObj.lifetime.m1 + "</b>");
	    $('#stats').show();
	});
}
/* WORK IN PROGRESS
function lastmatches(un_id){
	$.getJSON('https://api.faceit.com/stats/v1/stats/time/users/06b6394e-795d-4e8e-bfd3-79f9581607b1/games/csgo?page=0&size=5', function(jObj)
	{
		for(var i=0; i<5; i++)
	        {
	        	alert(jObj[i].i5);
	        }
	    //k_d = kills / deaths;
	    //k_d = k_d.toFixed(2);
	    //$( "#faceit" ).append("<br><b class='shadow'>K/D: " + k_d + " @ last 3</b>");
	});
}
*/

// XML PARSER
/*
$(function(){
  //Sample XML    
  var xml = "<?xml version='1.0' ?><doc><person><name>Sachin</name><age>21</age></person><person><name>Akash</name><age>18</age></person></doc>";
  //Parse the givn XML
  var xmlDoc = $.parseXML( xml ); 
  var $xml = $(xmlDoc);
    // Find Person Tag
  var $person = $xml.find("person");
  
  $person.each(function(){
    var name = $(this).find('name').text();
    var age = $(this).find('age').text();
    $("#ProfileList" ).append('<li>' +name+ ' - ' +age+ '</li>');
   });
});
*/

/*
function none_block(fName)
{
	//inviz -> viz;
	document.getElementById("stats").style.display="block";
}


function faceit(fName){
	document.getElementById("kd").innerHTML = "";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
	    if (this.readyState == 4 && this.status == 200) {
	        myObj = JSON.parse(this.responseText);
	        un_id = myObj.payload.guid;
	        var cflag;
	        // var steamid = myObj.payload.games.csgo.game_id;
	        cflag = myObj.payload.country;
	        cflag = cflag.toUpperCase();
	        if(myObj.payload.games.csgo.faceit_elo !== 0)
	        {
		        document.getElementById("flag").src = "https://cdn.faceit.com/frontend/335/assets/images/flags/" + cflag + ".png";
		        document.getElementById("faceit").innerHTML = "";
		        document.getElementById("faceit").innerHTML += "ELO: " + myObj.payload.games.csgo.faceit_elo + "<br> Level: " + myObj.payload.games.csgo.skill_level;
		    }
	    }
	    else
	    {
	    	document.getElementById("flag").src = "";
	    	document.getElementById("faceit").innerHTML = "";
	    	document.getElementById("faceit").innerHTML = "User not found";
	    }
	};
	var url = "https://api.faceit.com/core/v1/nicknames/";
	xmlhttp.open("GET", url + fName, true);
	xmlhttp.send();
	fName = "";
	none_block(fName);
}
function kd_stats(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onload = function () {
	    if (this.readyState == 4 && this.status == 200) {
	        jObj = JSON.parse(this.responseText);
	        var kills = 0;
	        var deaths = 0;
	        var k_d = 0;
	        for(var i=0; i<3; i++)
	        {
	        	match = jObj[i];
	        	kills = kills + parseFloat(match.i6);
	        	deaths = deaths + parseFloat(match.i8);
	        }
	        k_d = kills / deaths;
	        k_d = k_d.toFixed(2);
	        var textz = document.getElementById("faceit").innerHTML;
	        document.getElementById("kd").innerHTML = "K/D " + k_d;
	        k_d = 0;
	    }
	};
	var url = "https://api.faceit.com/stats/v1/stats/time/users/";
	var url_p2 = "/games/csgo?page=0&size=3";
	xmlhttp.open("GET", url + un_id + url_p2, true);
	xmlhttp.send();
	// 06b6394e-795d-4e8e-bfd3-79f9581607b1 = heuID
}

function l_kd_stats(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onload = function () {
	    if (this.readyState == 4 && this.status == 200) {
	        jObj = JSON.parse(this.responseText);
	        document.getElementById("kd").innerHTML = "K/D " + jObj.lifetime.k5 + " @ " + jObj.lifetime.m1;
	    }
	};
	var url = "https://api.faceit.com/stats/v1/stats/users/";
	var url_p2 = "/games/csgo";
	xmlhttp.open("GET", url + un_id + url_p2, true);
	xmlhttp.send();
}
*/