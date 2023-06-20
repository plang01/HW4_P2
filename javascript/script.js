/*
    File: script.js
    GUI Assignment: Creating an Interactive Dynamic Multiplication Table
    Phat Lang, UMass Lowell Computer Science, Phat_Lang@student.uml.edu
    What to submit: Readme file with Github URL and link to repository, a zip file contains the code 
    Description: Create a program to generate multiplication table uitlizing HTML and should based on user inputs. In addition, the program 
    should handle all unexpected input and provide feedback.
    Copyright (c) 2023 by Phat Lang. All rights reserved. May be freely copied or
    excerpted for educational purposes with credit to the author. Updated by Phat Lang on June 11 at 1:44 p.m
    References/Citations: I used W3Schools, Mozilla for references. 
    Additionally, I took some of the codes from these website
       https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript
       https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions
*/

// https://www.javascript-coder.com/form-validation/jquery-form-validation-guide/
// https://jqueryvalidation.org/
// https://infoheap.com/jquery-ui-slider-and-input-text-box-two-way-binding/

function get_Input(table_id){
    var table_value;
    // Get user input
    table_value = document.getElementById(table_id).value;
    table_value = Number(table_value);
    return table_value;
  }
  
  function generate_Table(id){
    //Remove old table to generate a new one
    // var div = document.getElementById('mult-table');
    var div = document.getElementById(id);
    while(div.firstChild){
      div.removeChild(div.firstChild);
    }
      // Get user inputs
      var min_column = get_Input('table_min_column field1');
      var max_column = get_Input('table_max_column field2');
      var min_row = get_Input('table_min_row field3');
      var max_row = get_Input('table_max_row field4');
  
      var form = $("#myForm");
      if (form.valid() == true) {
        addTable(min_column, max_column, min_row, max_row, div);
      }
  }
  
  function addTable(min_column, max_column, min_row, max_row, id) {
      var dummy = min_column;
      var dummy2 = min_row;
      var r = min_row - 1;
      var c = min_column - 1;
      var arr = [];
      var column_length = findLength(min_column, max_column);
      var row_length = findLength(min_row, max_row);
  
      //Create 2-D arrays containing multiplication values
      for(var i = 0; i < row_length; i++) {
        arr[i] = []
        if(i == 0) {
          for(var j = 1; j < column_length; j++){
            arr[0][j] = dummy;
            dummy++;
          }
        }
        else {
          for(var j = 0; j < column_length; j++){
            if(j==0){
              arr[i][j] = dummy2;
              dummy2++
            }
            else {
              arr[i][j] = r * c;
            }
            c++;
          }
        }
        c=min_column-1;
        r++;
      }  
  
      // Generate table using HTML 
      // var myTableDiv = document.getElementById("mult-table");
      var myTableDiv = id;
      var tableBody = document.createElement('table');
    
      for (var i = 0; i < row_length; i++) {
        var tr = document.createElement('tr');
        tableBody.appendChild(tr);
    
        for (var j = 0; j < column_length; j++) {
          var td = document.createElement('th');
          td.appendChild(document.createTextNode(arr[i][j]));
          tr.appendChild(td);
        }
      }
      myTableDiv.appendChild(tableBody);
    }
  
    function validateForm() {
      // Get error message HTML block
      var col_min = document.getElementById("col_min_message");
      var col_max = document.getElementById("col_max_message");
      var row_min = document.getElementById("row_min_message");
      var row_max = document.getElementById("row_max_message");
      // Error Message
      var message = "No Blank Input";
      var message2 = "Must Be Whole Number";
      var message3 = "Min Value > Max Value";
      var message4 = "Min to Max Cannot Exceed 200";
      var message5 = "Value must be bewteen -1e+15 to 1e+15";
      // Get value 
      var c_min = get_Input('table_min_column');
      var c_max = get_Input('table_max_column');
      var r_min = get_Input('table_min_row');
      var r_max = get_Input('table_max_row');
      // If conditions not met, set status to false and output error message
      var status = true;
  
      // Repeat error message if conditions not met
      while(col_min.firstChild){
        col_min.removeChild(col_min.firstChild);
      }
      while(col_max.firstChild){
        col_max.removeChild(col_max.firstChild);
      }
      while(row_min.firstChild){
        row_min.removeChild(row_min.firstChild);
      }
      while(row_max.firstChild){
        row_max.removeChild(row_max.firstChild);
      }
  
      // Min_Column Validation
      if (c_min == "" && c_min != 0) {
        col_min.textContent += message;
        status = false;
      }
      // Input needs to be number, allows +/- sign in the front 
      else if (!(/^[+-]?\d+$/.test(c_min))){
        col_min.textContent += message2;
        status = false;
      }
      // Min value cannot be greater than max
      else if (c_min > c_max){
        col_min.textContent += message3;
        status = false;
      }
      // Value need to be between -1e15 < x < 1e15
      else if ( c_min < (-1e15) || c_min > (1e15)){
        col_min.textContent += message5;
        status = false;
      }
  
      // Max_Column Validation
      if (c_max == "" && c_max != 0){
        col_max.textContent += message;
        status = false;
      }
      // Input needs to be number, allows +/- sign in the front 
      else if (!(/^[+-]?\d+$/.test(c_max))){
        col_max.textContent += message2;
        status = false;
      }
      //Range cannot exceed 200
      else if (findLength(c_min, c_max) > 202) {
        col_max.textContent += message4;
        status = false;
      }
      // Value need to be between -1e15 < x < 1e15
      else if ( c_max < (-1e15) || c_max > (1e15)){
        col_max.textContent += message5;
        status = false;
      }
  
      // Min_Row Validation
      if (r_min == "" && r_min != 0){
        row_min.textContent += message;
        status = false;
      }
      // Input needs to be number, allows +/- sign in the front 
      else if (!(/^[+-]?\d+$/.test(r_min))){
        row_min.textContent += message2;
        status = false;
      }
      // Min value cannot be greater than max
      else if (r_min > r_max){
        row_min.textContent += message3;
        status = false;
      }
      // Value need to be between -1e15 < x < 1e15
      else if ( r_min < (-1e15) || r_min > (1e15)){
        row_min.textContent += message5;
        status = false;
      }
  
      // Max_Row Validation
      if (r_max == "" && r_max != 0){
        row_max.textContent += message;
        status = false;
      }
      // Input needs to be number, allows +/- sign in the front 
      else if (!(/^[+-]?\d+$/.test(r_max))){
        row_max.textContent += message2;
        status = false;
      }
      // Range cannot exceed 200
      else if (findLength(r_min, r_max) > 202){
        row_max.textContent += message4;
        status = false;
      }
      // Value need to be between -1e15 < x < 1e15
      else if ( r_max < (-1e15) || r_max > (1e15)){
        row_max.textContent += message5;
        status = false;
      }
  
      return status;
    }
  
    // Find the length given two numbers
    function findLength(val1, val2){
      if (val1 < 0 && val2 > 0){
        return Math.abs(val1) + Math.abs(val2) + 2;
      }
      else {
         return Math.abs(Math.abs(val2) - Math.abs(val1)) + 2;
      }
    }
  
    jQuery.validator.addMethod("integer", function(value, element){
      return this.optional(element) || /^[+-]?\d+$/.test(value);
    }, "Please Enter Whole Integer");
  
    // just for the demos, avoids form submit
    // jQuery.validator.setDefaults({
    //   debug: true,
    //   success: "valid"
    // });
  
    $( "#myForm" ).validate({
      rules: {
        field1: {
          required: true,
          integer: true,
          min:-200,
          max: 200
        },
        field2: {
          required: true,
          integer: true
        },
        field3: {
          required: true,
          integer: true,
          min: -200,
          max: 200
        },
        field4: {
          required: true,
          integer: true
        }
      }
    });
  
    $('[name=field1]').change(function()
    {
      var $input = $("[name=field2]");
      var value = get_Input("table_min_column field1")
      if(!(isNaN(value))){
        $input.rules("add", {min:value});
        $input.rules("add", {max:value + 200});
      }
    });
  
    $('[name=field3]').change(function()
    {
      var $input = $("[name=field4]");
      var value = get_Input("table_min_row field3")
      if(!(isNaN(value))){
        $input.rules("add", {min:value});
        $input.rules("add", {max:value + 200});
      }
    });

    $('[name=field2]').change(function()
    {
      var $input = $("[name=field1]");
      var value = get_Input("table_max_column field2")
      if(!(isNaN(value))){
        $input.rules("add", {min:value-200});
        $input.rules("add", {max:value});
      }
    });

    $('[name=field4]').change(function()
    {
      var $input = $("[name=field3]");
      var value = get_Input("table_max_row field4")
      if(!(isNaN(value))){
        $input.rules("add", {min:value-200});
        $input.rules("add", {max:value});
      }
    });


    // $(function t(formId, formSlider) {
    function t(formId,formSlider, formName, t){
    // var f1 = document.getElementById("table_min_column field1")
    // $("#col_min_slider").slider({
    //   min: -200, 
    //   max: 200, 
    //   step: 1,
    //   value: 0,
    //   slide: function( event, ui ) {
    //     $(f1).val(ui.value);
    //     generate_Table();
    //   }
    // });
    // var initialValue = $("#col_min_slider").slider("option", "value");
    // $(f1).val(initialValue);
    // $(f1).change(function() {
    //   var oldVal = $("#col_min_slider").slider("option", "value");
    //   var newVal = $(this).val();
    //     $("#col_min_slider").slider("option", "value", newVal);
    // });

    // var f1 = document.getElementById(formId)
    var f1 = formId;
    $(formSlider).slider({
      min: -200, 
      max: 200, 
      step: 1,
      value: 0,
      slide: function( event, ui ) {
      var $input = $(formName);
      var value = ui.value;

      var $s = $(t);
      var $s2 = document.getElementsByName("field4");
      if(!(isNaN(value))){
        if(formName === t){
          $input.rules("add", {min:value});
          $input.rules("add", {max:value + 200});
        }
        else {
          $input.rules("add", {min:value-200});
          $input.rules("add", {max:value});
        }
      }


        $(f1).val(ui.value);
;        generate_Table("mult-table");
      }
    });
    var initialValue = $(formSlider).slider("option", "value");
    $(f1).val(initialValue);
    $(f1).change(function() {
      var newVal = $(this).val();
        $(formSlider).slider("option", "value", newVal);
    }); 
  };

  
  $(function(){
  var d = document.getElementById("table_min_column field1");
  var s = document.getElementById("col_min_slider");
  var d2 = document.getElementById("table_max_column field2");
  var s2 = document.getElementById("col_max_slider");
  var d3 = document.getElementById("table_min_row field3");
  var s3 = document.getElementById("row_min_slider");
  var d4 = document.getElementById("table_max_row field4");
  var s4 = document.getElementById("row_max_slider");

  var n2 = document.getElementsByName("field2");
  var n1 = document.getElementsByName("field1");
  var n3 = document.getElementsByName("field3");
  var n4 = document.getElementsByName("field4");
  t(d,s, n2, n2);
  t(d2,s2, n1, n3);
  t(d3,s3, n4, n4);
  t(d4,s4, n3, n2);
  });

  $("#tabs").tabs();


  var tabCounter = 1;

  function addTab() {
    var col_min = get_Input("table_min_column field1");
    var col_max = get_Input("table_max_column field2");
    var row_min = get_Input("table_min_row field3");
    var row_max = get_Input("table_max_row field4");
    var label = col_min + " to " + col_max + " By " + row_min + " to " + row_max;
    var id = "tabs-" + tabCounter++;
    var li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) )
    var tabContentHTML = 5;
    console.log("Counter is " + tabCounter++);
    console.log(label);
  }


  
  
  